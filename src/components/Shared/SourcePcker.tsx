import Form from 'react-bootstrap/Form';
import { ISourceItem } from "../../utils/types";

type Props = {
    sourceId : string, 
    sourceItems: ISourceItem[], 
    changeSource: Function
};
  
export default function SourcePicker({ sourceId, sourceItems, changeSource } : Props) {

    return (                   
        <Form>
            <Form.Group className="mb-3" controlId="formFeedType">         
                <Form.Select 
                onChange={e => changeSource(e.target.value)}
                value={sourceId} >
                    <option value="">Select a source</option>
                    {
                        sourceItems.map((sourceItem, index) => {
                            return (
                                <option 
                                key={index}
                                value={sourceItem.id}>{sourceItem.name}</option>
                            )
                        })
                    }
                </Form.Select>
            </Form.Group> 
        </Form>      
    );
}