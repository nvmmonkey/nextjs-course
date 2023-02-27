import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();
  console.log(router.pathname);
  console.log(router.query);

  //send a request to the backend server to request piece of data
  //fetch() some data by filter project id using router.query.projectid

  return (
    <div>
      <h1>Portfolio Project Page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
