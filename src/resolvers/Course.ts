import { Query, Resolver, Arg } from "type-graphql";
import { Course } from "../entities/Course";
import courses from '../../data/course.json';

@Resolver()
class CourseResolver {
  @Query(_returns => Course)
  async getCourseById(@Arg("id") id: string){
    console.log('Course Id:', id);
    const courseDoc = courses.find(doc=>doc.id.toString() === id.toString());
    return courseDoc;
  }
}

export default CourseResolver;