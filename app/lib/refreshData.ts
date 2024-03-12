import { useRouter } from "next/navigation";
const refreshData = () => {
  const router = useRouter();
  router.refresh();
};

export default refreshData;
