'use client';
import QuestionLoader from "@/app/QuestionLoad";
import LALoader from "@/app/LA_Loader";


export default function IntegralPage() {
    return <>
    <QuestionLoader filePath="MCquestion/IB Calculus/Int.txt" />
    <LALoader filePath="LAquestion/IB Calculus/Int.txt" course="IB Calculus" />
    
    </>;
  }