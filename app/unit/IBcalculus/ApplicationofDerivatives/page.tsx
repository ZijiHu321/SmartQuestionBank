'use client';
import QuestionLoader from "@/app/QuestionLoad";
import LALoader from "@/app/LA_Loader";


export default function LimitandContinuityPage() {
    return <>
    <QuestionLoader filePath="MCquestion/IB Calculus/App.txt" />
    <LALoader filePath="LAquestion/IB Calculus/App.txt" course="IB Calculus" />
    
    </>;
  }