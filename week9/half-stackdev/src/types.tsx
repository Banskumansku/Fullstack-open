interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
    name: "Fundamentals";
    description: string;
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
    name: "Deeper type usage";
    description: string;
    exerciseSubmissionLink: string;
}

interface SomeCourse extends CoursePartBase {
    name: "Some course";
    description: "It's a course"
    exerciseCount: 6;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | SomeCourse;