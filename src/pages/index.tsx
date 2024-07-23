import { Button, Input, Password, Title } from "rizzui";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen border border-gray-400">
      <div className="border border-gray-400 rounded-2xl p-8">
        <Title as="h1">Faça login para continuar</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-8">
            <Input
              {...register("email", { required: true })}
              label="E-mail"
              placeholder="Digite seu e-mail"
              type="email"
            />
          </div>

          <div className="my-8">
            <Password
              {...register("password", { required: true })}
              label="Senha"
              placeholder="Digite sua senha"
            />
          </div>

          <Button variant="outline" type="submit">Entrar</Button>
          <p>Ainda não tem uma conta? <Link href="/register">Cadastre-se!</Link></p>
        </form>
      </div>
    </div>
  );
}
