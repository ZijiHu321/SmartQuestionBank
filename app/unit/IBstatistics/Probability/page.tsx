'use client';
import QuestionLoader from "@/app/QuestionLoad";
import LALoader from "@/app/LA_Loader";


export default function ProbabilityPage() {
    return <>
    <QuestionLoader filePath="MCquestion/IB Statistics/Probability.txt" />
    <LALoader filePath="LAquestion/IB Statistics/Probability.txt" course="IB Statistics" />
    
    </>;
  }