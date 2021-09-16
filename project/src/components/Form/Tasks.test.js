import TasksController from './Tasks'
import { fireEvent, render, screen} from '@testing-library/react';

test('limit 0-10 to weight', ()=>{

    var activities = {
        info:{
            name: "Atividades",   
            total_weight: 0
        },
        list:[],
    }

    const updateActivities = jest.fn()

    const { getAllByTestId } = render(<TasksController data={activities} onUpdate={updateActivities}/>)
    
    const number_input = (screen.getByTestId("total_weight_label"))

    fireEvent.change(number_input,{target: { value: -1 }})
    expect(number_input.value).toBe('0')

    fireEvent.change(number_input,{target: { value: 0 }})
    expect(number_input.value).toBe('0')

    fireEvent.change(number_input,{target: { value: 10 }})
    expect(number_input.value).toBe('10')

    fireEvent.change(number_input,{target: { value: 11 }})
    expect(number_input.value).toBe('10')
  
  })
