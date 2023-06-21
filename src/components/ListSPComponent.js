import React, {useState, useEffect} from 'react'
import SPService from '../services/SPService'
import './css/home.css'
const ListSPComponent = () => {

    const [streamingPlatforms, setSP] = useState([])
    useEffect(() => {

        getAllStreamingPlatforms();
    }, [])

    const getAllStreamingPlatforms = () => {
        SPService.getAllStreamingPlatforms().then((response) => {
            setSP(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    return (
        <div className = "container">
            <h2 className = "text-center"> List Streaming Platforms </h2>
<br></br>
<img src="/image/loga.png" alt="" class="center"></img>
<br></br>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <th> Name </th>
                    <th> Creation date </th>
                    <th> Cost </th>

                </thead>
                <tbody>
                    {
                        streamingPlatforms.map(
                            streamingPlatform =>
                            <tr key = {streamingPlatform.name}> 
                                <td> {streamingPlatform.name} </td>
                                <td> {streamingPlatform.creationDate} </td>
 
                                <td>{streamingPlatform.cost}</td>
                                
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListSPComponent