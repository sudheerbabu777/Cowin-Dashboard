// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationGender} = props

  return (
    <div className="vaccination-gender-container">
      <h1 className="vaccination-gender">Vaccination by Gender</h1>
      <PieChart width={900} height={400}>
        <Pie
          cx="50%"
          cy="60%"
          data={vaccinationGender}
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="other" fill="#2cc6c6" />
        </Pie>

        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          WrapperStyle={{
            fontSize: 20,
            fontFamily: 'Robotot',
          }}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
