import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getList } from "../api/list";

interface Donation {
  id: string;
  title: string;
  donator: string;
};

interface List {
  id: string;
  manager: string;
  items: Donation[]
};

export function useList() {
  const [list, setList] = useState<List>({
    id: "",
    manager: "",
    items: []
  });

  const [donations, setDonations] = useState<Donation[]>([]);

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    getList(path).then(res => {
      const list = res.data;
      setList(list);
      setDonations(list.items);
    });
  }, [path]);

  async function getUpdatedListData() {
    const list = await getList(path).then(res => res.data);
    const donations = list.items;

    return { list, donations };
  };

  return {
    list,
    donations,
    getUpdatedListData
  };
};