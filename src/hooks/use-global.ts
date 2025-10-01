import { IUser } from "@/models/user";

export const useGlobal = () => {

  const getHomeInfo = async () => {
    let bills = 0;
    let legislators = 0;
    let users = 0;

    try {
      const [billsResponse, usersResponse] = await Promise.all([
        fetch('/api/bill'),
        fetch('/api/users')
      ]);

      const billsData = await billsResponse.json();
      const usersData = await usersResponse.json();

      console.log("Data", {
        "billsData": billsData,
        "usersData": usersData
      })

      bills = billsData.length;
      legislators = usersData.filter((user: IUser) => user.role === 'legislator').length;
      users = usersData.filter((user: IUser) => user.role !== 'legislator').length;
    } catch (error) {
      console.error('Failed to fetch home info:', error);
      // throw error;
    }

    return {
      bills,
      legislators,
      users
    };
  }

  return {
    getHomeInfo,
  };
}