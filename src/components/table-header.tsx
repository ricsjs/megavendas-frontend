import Link from "next/link";
import { useContext, useState } from "react";
import {
  Modal,
  Button,
  ActionIcon,
  Input,
  FileInput,
  Title,
} from "rizzui";
import { IoMdClose } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import Papa from "papaparse";
import { createGroup } from "@/pages/dashboard/api";
import { CreateGroupRequest } from "@/pages/dashboard/types";
import { AuthContext } from "@/contexts/AuthContext";

interface Group {
  userId: string;
  name: string;
  contatos: FileList | null;
}

export default function TableHeader() {
  const [modalState, setModalState] = useState(false);
  const { register, handleSubmit, reset } = useForm<Group>();
  const { user } = useContext(AuthContext);

  const openModal = () => {
    setModalState(true);
  };

  const onSubmit: SubmitHandler<Group> = async (data) => {
    if (data.contatos && data.contatos[0]) {
      const file = data.contatos[0];
      Papa.parse(file, {
        complete: async (result: any) => {
          const parsedData = result.data as [string, string][];
          const formattedData = parsedData.map(([nome, telefone]) => ({
            name: nome,
            phone_number: telefone,
          }));

          const requestData: CreateGroupRequest = {
            userId: user,
            name: data.name,
            contacts: formattedData.map(contact => ({
              name: contact.name,
              phone_number: contact.phone_number,
            })),
          };

          try {
            await createGroup(requestData);
            console.log("Grupo cadastrado com sucesso!");
            window.location.reload();
          } catch (error) {
            console.error("Erro ao cadastrar grupo:", error);
          } finally {
            setModalState(false);
            reset();
          }
        },
        header: false,
        skipEmptyLines: true,
        delimiter: ",",
      });
    }
  };

  return (
    <nav className="text-gray-900 p-4 flex justify-between items-center w-full mt-12">
      <div className="text-xl font-bold">
        <Link href="#">Meus grupos</Link>
      </div>
      <div className="flex space-x-4">
        <Button className="hover:text-gray-400" onClick={openModal}>
          Criar novo grupo
        </Button>
        <Modal isOpen={modalState} onClose={() => setModalState(false)}>
          <div className="m-auto px-7 pt-6 pb-8">
            <div className="mb-7 flex items-center justify-between">
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => setModalState(false)}
              >
                <IoMdClose className="h-auto w-6" strokeWidth={1.8} />
              </ActionIcon>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium">
              <Title className="col-span-2" as="h2">Criar novo grupo</Title>
              <form className="col-span-2" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Nome do grupo *"
                  inputClassName="border-2"
                  size="lg"
                  className="col-span-2 mb-10"
                  {...register("name", { required: true })}
                />

                <FileInput
                  className="col-span-2 mb-10"
                  label="Envie um arquivo csv com os contatos do grupo"
                  {...register("contatos")}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="col-span-2 mt-2"
                >
                  Criar grupo
                </Button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </nav>
  );
}
