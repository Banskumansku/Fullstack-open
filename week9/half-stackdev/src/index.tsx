import React from "react";
import ReactDOM from "react-dom";

interface PartProps {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  parts: PartProps[]
}

const Header: React.FC<{ courseName: string }> = ({ courseName }) => {
  return (
    <div>{courseName}</div>
  )
}


const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      <p>
        {props.parts[0].name} {props.parts[0].exerciseCount}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exerciseCount}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exerciseCount}
      </p>
    </div>
  )
}

const Total: React.FC<ContentProps> = (props) => {
  return (<div>
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry: number, part: any) => carry + part.exerciseCount, 0)}
    </p>
  </div>)
}


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
