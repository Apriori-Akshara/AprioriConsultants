import { useRouter } from "next/router";
import ResultsPage from "../../../components/SATTest/ResultsPage";
import Navbar from '../../../components/NavbarJS';

export default function Results() {
  const router = useRouter();
  const { id, answers } = router.query;

  if (!id || !answers) {
    return <p>Loading...</p>;
  }

  return (
  <>      
  <Navbar />
  <ResultsPage id={id} answers={JSON.parse(answers)} />
  </>)
}