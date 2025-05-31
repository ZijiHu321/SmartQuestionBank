import React from 'react'
import { useState } from 'react'
import SearchItem from './SearchItem'
import PdfTable from './Table'

// type PdfItem = {
//   course: string;
//   unit: string;
//   examType: string;
//   filename: string; 
// };

const [List, setList] = useState([
  // cal1 course
  { course: 'cal1', unit: 'Limits and Continuity', examType: 'Unit Test', filename: 'cal1_Limits and Continuity.pdf' },
  { course: 'cal1', unit: 'Finding Derivative Functions', examType: 'Unit Test', filename: 'cal1_Finding Derivative Functions.pdf' },
  { course: 'cal1', unit: 'Properties of Curves', examType: 'Unit Test', filename: 'cal1_Properties of Curves.pdf' },
  { course: 'cal1', unit: 'Application of Derivatives', examType: 'Unit Test', filename: 'cal1_Application of Derivatives.pdf' },

  // ib_cal course
  { course: 'ib_cal', unit: 'Limits', examType: 'Unit Test', filename: 'ib_cal_Limits.pdf' },
  { course: 'ib_cal', unit: 'Finding Derivative Functions', examType: 'Unit Test', filename: 'ib_cal_Finding Derivative Functions.pdf' },
  { course: 'ib_cal', unit: 'Properties of Curves', examType: 'Unit Test', filename: 'ib_cal_Properties of Curves.pdf' },
  { course: 'ib_cal', unit: 'Application of Derivatives', examType: 'Unit Test', filename: 'ib_cal_Application of Derivatives.pdf' },
  { course: 'ib_cal', unit: 'Integral', examType: 'Unit Test', filename: 'ib_cal_Integral.pdf' },
  { course: 'ib_cal', unit: 'Kinematics', examType: 'Unit Test', filename: 'ib_cal_Kinematics.pdf' },
  { course: 'ib_cal', unit: 'Taylor Series', examType: 'Unit Test', filename: 'ib_cal_Taylor Series.pdf' },
  { course: 'ib_cal', unit: 'Differential Equations', examType: 'Unit Test', filename: 'ib_cal_Differential Equations.pdf' },

  // ib_stat course
  { course: 'ib_stat', unit: 'Probability', examType: 'Unit Test', filename: 'ib_stat_Probability.pdf' },
  { course: 'ib_stat', unit: 'Statistics', examType: 'Unit Test', filename: 'ib_stat_Statistics.pdf' },
  { course: 'ib_stat', unit: 'Discrete Random Variables', examType: 'Unit Test', filename: 'ib_stat_Discrete Random Variables.pdf' },
  { course: 'ib_stat', unit: 'Continuous Random Variables', examType: 'Unit Test', filename: 'ib_stat_Continuous Random Variables.pdf' },
]);

const [search, setSearch] = useState<string>('')

const MockExam = () => {
    
  return (
    <div>
        <header> 
            <h1>Mock Examaminations</h1>
        </header>

        <SearchItem
        search={search}
        setSearch={setSearch}
        />

        <PdfTable
        List = {List.filter(item => (item.course.toLowerCase().includes(search.toLowerCase()) ||
        item.unit.toLowerCase().includes(search.toLowerCase()) ||
        item.examType.toLowerCase().includes(search.toLowerCase())))}
        setList = {setList}

        />
    </div>
  )
}

export default MockExam