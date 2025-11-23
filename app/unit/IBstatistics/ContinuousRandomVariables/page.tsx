'use client';
import QuestionLoader from "@/app/QuestionLoad";
import LALoader from "@/app/LA_Loader";


export default function ContinuousRandomVariablePage() {
    return <>
    <QuestionLoader filePath="MCquestion/IB Statistics/ContinuousRandomVariable.txt" />
    <LALoader filePath="LAquestion/IB Statistics/ContinuousRandomVariable.txt" course="IB Statistics" />
    
    </>;
  }