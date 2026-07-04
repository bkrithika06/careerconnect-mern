import Button from "../common/Button";
import formatSalary from "../../utils/formatSalary";
import { FaLocationDot } from "react-icons/fa6";

function JobCard({ job, onApply }) {
  return (
    <div className="job-card">

      <div className="job-top">

        <div>
          <h2>{job.title}</h2>

          <p className="company">
            {job.company}
          </p>
        </div>

        <span className="salary">
          {formatSalary(job.salary)}
        </span>

      </div>

      <div className="job-info">

        <span>
  <FaLocationDot style={{ marginRight: "6px", color: "#2563EB" }} />
  {job.location}
</span>

      </div>

      <p className="description">
        {job.description}
      </p>

      <div className="skills">

        {job.skills?.map((skill, index) => (

          <span
            className="skill"
            key={index}
          >
            {skill}
          </span>

        ))}

      </div>

      <div className="job-footer">

        <Button onClick={() => onApply(job._id)}>
          Apply Now
        </Button>

      </div>

    </div>
  );
}

export default JobCard;