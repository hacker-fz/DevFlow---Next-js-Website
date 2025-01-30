import { auth, signIn, signOut } from "@/auth";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <main>
      <h1> Welcome </h1>
    </main>
  );
};

export default Home;
