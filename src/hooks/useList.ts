import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getList } from "../api/list";

interface List {
  id: string;
  manager: string;
  items: {
    id: string;
    title: string;
    donator: string;
  }[]
};

export function useList() {
  const [list, setList] = useState<List>();

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    getList(path)
      .then((res) => setList(res.data));
  }, [path]);

  return list;
};