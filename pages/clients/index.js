import Link from "next/link";

function AllClientPage() {
  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "manu", name: "Manuel" },
    { id: "julia", name: "Julia" },
  ];
  return (
    <div>
      <h1>The Client Page</h1>
      <ul>
        {clients.map((eachClient) => {
          return (
            <li key={eachClient.id}>
              <Link
                href={{
                  pathname: "/clients/[id]",
                  query: { id: eachClient.id },
                }}
              >
                {eachClient.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllClientPage;
