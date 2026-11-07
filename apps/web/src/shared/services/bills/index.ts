import api from "@/shared/api";

export const createBill = async <T>(body: T) => {
  console.log({ body });

  return api.post("/bills", body);
};
