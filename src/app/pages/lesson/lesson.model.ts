export interface ILesson{
    id?: number;
    title?: string | null;
    time?: number;
    video_url?: string;
    section_id?: number | null;
    videoFile?: File;
}
export class Lesson implements ILesson{
    constructor(
        public id?: number,
        public title?: string | null,
        public time?: number,
        public video_url?: string,
        public section_id?: number | null,
        public videoFile?: File,
    ) {}
}

export function getLessonIdentifier(lesson: Lesson) {
    return lesson.id;
}
