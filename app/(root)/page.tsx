import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to create a custom hook in React?",
    description:
      "I want to create a custom hook in React that allows me to fetch data from an API. Can you help me with the code?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
    },
    views: 100,
    upvotes: 50,
    answer: 5,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn javascript?",
    description: "I want to learn javascript. Can you help me with the code?",
    tags: [
      { _id: "1", name: "react" },
      { _id: "2", name: "javascript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
    },
    views: 100,
    upvotes: 50,
    answer: 5,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [Key: string]: string }>; //query = 'react'
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams; //default value of query is ""

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="w-full flex-col-reverse flex sm:flex-row gap-4 sm:items-center justify-between">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient min-h-[46px] px-4 py-3">
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route={"/"}
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClass="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
