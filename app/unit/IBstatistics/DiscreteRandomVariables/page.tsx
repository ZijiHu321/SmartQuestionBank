'use client';
import QuestionLoader from "@/app/QuestionLoad";
import LALoader from "@/app/LA_Loader";


export default function DiscreteRandomVariablePage() {
    return <>
    <QuestionLoader filePath="MCquestion/IB Statistics/DiscreteRandomVariable.txt" />
    <LALoader filePath="LAquestion/IB Statistics/DiscreteRandomVariable.txt" course="IB Statistics" />
    
    </>;
  }