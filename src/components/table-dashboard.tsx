import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { deleteGroup, fetchGroupsData } from '@/pages/dashboard/api';

interface Contact {
  name: string;
  phone_number: string;
}

interface GroupData {
  id: string;
  name: string;
  contacts: Contact[];
}

const TableDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [groupData, setGroupData] = useState<GroupData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (user) {
          const response = await fetchGroupsData(user);
          if (response.length === 0) {
            console.log("Não foram encontrados registros");
          }
          setGroupData(response);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchGroupData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  const handleDeleteGroup = async (groupId: string) => {
    try {
      await deleteGroup(groupId);
      setGroupData(prevGroups => prevGroups.filter(group => group.id !== groupId));
    } catch (error) {
      console.error("Erro ao excluir grupo:", error);
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden p-4">
      <table className="w-full min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Grupo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contatos</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {groupData?.map((group) => (
            <tr key={group.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{group.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {group.contacts.map((contact, contactIndex) => (
                  <div key={contactIndex}>{`${contact.name} - ${contact.phone_number}`}</div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button onClick={() => handleDeleteGroup(group.id)} className="text-red-500 hover:text-red-700">Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDashboard;
