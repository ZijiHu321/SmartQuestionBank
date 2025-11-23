'use client';
import QuestionLoader from "@/app/QuestionLoad";
import LALoader from "@/app/LA_Loader";


export default function StatisticsPage() {
    return <>
    <QuestionLoader filePath="MCquestion/IB Statistics/Statistics.txt" />
    <LALoader filePath="LAquestion/IB Statistics/Statistics.txt" course="IB Statistics" />
    
    </>;
  }