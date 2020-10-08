import React, { useEffect } from 'react';
import {db} from '../../../firebase/firebase'
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button} from 'antd';

const AddStudent = (props) => {
    
    let password = props.password
    let email = props.email
    let name = props.name
    let lateness = props.lateness
    let lvl = props.lvl
    let skips = props.skips
    let disgrace = props.disgrace
    let responsible = props.responsible
    let concert = props.concert
    let equipment = props.equipment
    let discharges = props.discharges
    let count = props.count
    let uid = props.uid
    

    const addNewStudent = () => {
        console.log(props.values)
            db.collection('students')
                .doc(uid)
                .set({
                    password: password,
                    email: email,
                    name: name,
                    lateness: lateness,
                    lvl: lvl,
                    skips: skips,
                    disgrace: disgrace,
                    responsible: responsible,
                    concert: concert,
                    equipment: equipment,
                    discharges: discharges,
                    count: count,
                    uid: uid
                })
    }

    

    
        return (
            <div>
                <Button type="primary" htmlType="submit" onClick={addNewStudent}>
              Submit
            </Button>
            </div>
        );
    
}

export default AddStudent;