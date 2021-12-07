import {useState} from "react";
import {useNavigate} from "react-router-dom"

const Form = ({initialBlog, handleSubmit, buttonLabel}) => {

    const navigate = useNavigate()

    // The Form State
    const [formData, setFormData] = useState(initialBlog)

    // Handle Change to Update State when Input changes
    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    // HandleSubmit for when the form submitted
    const handleSubmission = (event) => {
        // prevent the page from refresh
        event.preventDefault()
        // pass the formData to the handleSubmit function passes as props
        handleSubmit(formData)
        // push user back to main page
        navigate("/")

    }

    return <form onSubmit={handleSubmission}>
        <input style={{
            maxWidth: "300px",
            display: "center"
            }} // What is the best way to create a centered display
            type="text"
            onChange={handleChange}
            value={formData.subject}
            name="subject"
            placeholder="Subject"
        />
        <input style={{
            maxWidth: "300px",
            display: "center"
            }} // What is the best way to create a centered display
            type="text"
            onChange={handleChange}
            value={formData.details}
            name="details"
            placeholder="Details"
        />
        <input type="submit" value={buttonLabel} />
    </form>
};

export default Form;