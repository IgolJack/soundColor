import React, {useState} from 'react';
import { Input, Row, Col} from 'antd';
const { TextArea } = Input;

const Description = (props) => {
        const [editableStr, setEditableStr] = useState(props.description);

        const handleChange = (event) => {
            setEditableStr(event.target.value);
        };
    return (
   <>
     <Row>
      <Col flex="20px" style={{textAlign:'center',height: 'inherit', writingMode:"vertical-lr", transform:'rotate(180deg)'}}>   
         Описание   
      </Col>
      <Col flex="auto">
      <TextArea style={{minHeight:'98px'}}  onChange={handleChange} value={editableStr} rows={4} />
      </Col>
    </Row>
   </>  
   )
}

export default Description;