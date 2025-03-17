export const mainMuscleGrourArr = [
  { nameRu: "Бицепс", nameEn: "biceps" },
  { nameRu: "Трицепс", nameEn: "triceps" },
  { nameRu: "Грудь", nameEn: "chest" },
  { nameRu: "Ноги", nameEn: "legs" },
  { nameRu: "Плечи", nameEn: "shoulders" },
  { nameRu: "Спина", nameEn: "back" },
];

export const filterElements = [
  { nameEn: "popular", nameRu: "По популярности", increment: true },
  { nameEn: "raiting", nameRu: "По увеличению рейтинга", increment: true },
  { nameEn: "raiting", nameRu: "По уменьшению рейтинга", increment: false },
  { nameEn: "name", nameRu: "По имени", increment: true },
];

export const coachesFilterElements = [
  { nameEn: "popular", nameRu: "По популярности", increment: true },
  { nameEn: "workoutsArr", nameRu: "Количество тренировок (сначала больше)", increment: false },
  { nameEn: "workoutsArr", nameRu: "Количество тренировок (сначала меньше)", increment: true },
  { nameEn: "name", nameRu: "По имени", increment: true },
];

export const raitingExerciseArr = [
  { nameRu: "1", nameEn: "1" },
  { nameRu: "2", nameEn: "2" },
  { nameRu: "3", nameEn: "3" },
  { nameRu: "4", nameEn: "4" },
  { nameRu: "5", nameEn: "5" },
];

export interface asyncThunkStatus {}

export interface IExercises {}

export interface IComment {
  _id: string | undefined;
  data: Date;
  exerciseId: string | undefined;
  score: number | undefined;
  text: string | undefined;
  userId: { email: string; name: string } | undefined;
}

export interface IExercise {
  _id: string | undefined;
  id: string | undefined;
  name: string | undefined;
  image?: string | undefined;
  isBest: boolean | undefined;
  type: string | undefined;
  raiting: number | undefined;
  video: string | undefined;
  description: string | undefined;
  muscleGroups: string[] | undefined;
  mainGroup: string | undefined;
  mainGroupRu: string | undefined;
  createdUserId?: string | undefined;
  comments: IComment[] | undefined;
  avgUsersRaiting?: string;
}

export interface IWorkout {
  _id: string;
  comments: string;
  date: Date;
  userId:
    | string
    | {
        _id: string;
        email: string;
        name: string;
      };
  studentsIdArr: [
    {
      _id: string;
      email: string;
      name: string;
    }
  ];

  name: string;
  exercisesArr:
    | [
        {
          name: string;
          exercise: { id: string; name: string; _id: string };
          exerciseId: string;
          reps: number;
          sets: number;
          isCompletedArr?: [{ studentId?: string; isCompleted?: boolean }] | [];
        }
      ]
    | [];
}

export interface ICoachesArr {
  coachId: string;
  addRequestId: string;
}

export interface IStudentsArr {
  studentId: string;
  addRequestId: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  workoutsArr?: IWorkout[];
  exercisesArr?: IExercise[];
  reviewsArr?: String[];
  coachesArr?: ICoachesArr[] | [];
  studentsArr?: IStudentsArr[] | [];
  addToStudentsRequests?: String[];
  requestToCoach?: String[];
  userType?: String;
}

export interface IReqToCoach {
  active: boolean;
  coachId: string;
  userId: string;
  rejectedByCoach?: Boolean;
  _id: string;
}

export interface IStudents {
  studentId: string;
  addRequestId: string;
}

export interface ICoachToList {
  _id: string;
  email: string;
  name: string;
  workoutsCount?: number;
  exercisesArr?: String[];
  studentsArr?: IStudents[];
  requestToCoach?: IReqToCoach[];
}

export interface IResponseUser {
  message: string;
  result: IUser;
}

export interface IResponseArrExercises {
  message: string;
  result?: IExercise[];
}

export interface IResponseOneExercise {
  message: string;
  result?: IExercise;
}

export enum UserType {
  Admin = "admin",
  Coach = "coach",
  User = "user",
}

export interface IAddToStudentsReq {
  userId: {
    _id: string;
    email: string;
    name: string;
  };
  active: boolean;
  rejectedByCoach?: boolean;
  _id: string;
}

export interface IUserSchema {
  email: String;
  name: String;
  password: String;
  userType: UserType;
  workoutsArr?: String[];
  exercisesArr?: String[];
  reviewsArr?: String[];
  coachesArr?: String[];
  studentsArr?: String[];
  addToStudentsRequests?: String[];
  requestToCoach?: String[];
}

export interface IWorkoutSchema {
  comments: String;
  date: Date;
  userId: String;
  studentsIdArr: String[];
  name?: String;
  exercisesArr: [{ name: String; id: String; sets: Number; reps: Number }];
}

export interface IExerciseSchema {
  id: String;
  name: String;
  image?: String;
  imageFile?: File | undefined;
  isBest?: Boolean;
  type: String;
  raiting?: Number;
  muscleGroups: String[];
  video: String;
  description: String;
  mainGroup: String;
  mainGroupRu: String;
  commentsArr?: String[];
  createdUserId?: String;
  avgUsersRaiting?: String;
}

export interface ICommentSchema {
  data: Date;
  score: Number;
  text: String;
  exerciseId: String;
  userId: String;
}

export interface IAddToCoachRequstSchema {
  _id: string;
  userId: String;
  coachId: String;
  active: Boolean;
  rejectedByCoach?: Boolean;
}

export interface IGTSAttemptSchema {
  telegramUserName?: string;
  telegramID: number;
  startDate: Date;
  GTSGameID: string;
  timeRemained: number;
  attemptTime: number;
  isCompleted: boolean;
  currentQuestion: number;
  answerTime: number;
  attemptQuestionStatus: {
    questionID: string;
    getAnswer: boolean;
    answerIsCorrect?: boolean;
    userAnswerSongName?: string;
    correctAnswerSongName?: string;
    bonusTime?: number;
  }[];
  firstName?: string;
  lastName?: string;
  userPhoto?: string;
}

export interface IGTSGameSchema {
  name: string;
  userID: string;
  isCompleted: boolean;
  // isCorrect: boolean;
  changeDate: Date;
  GTSGameObj: { songURL: string; correctAnswerIndex: number; answersArr: { text: string }[] }[];
}

export interface IOneExerciseTypes {
  nameRu: string;
  nameEn: string;
}

export interface IExercisesTypes {
  nameRu: string;
  nameEn: string;
}
[];

export interface ICurrentCoachStudents {
  _id: string;
  email: string;
  name: string;
}

export interface ICurrentCoachStudent {
  _id: string;
  studentsArr: {
    studentId: {
      _id: string;
      email: string;
      name: string;
    };
    addRequestId: string;
  };
}

export const exerciseTypes: IOneExerciseTypes[] = [
  { nameRu: "Бицепс", nameEn: "biceps" },
  { nameRu: "Трицепс", nameEn: "triceps" },
  { nameRu: "Грудь", nameEn: "chest" },
  { nameRu: "Ноги", nameEn: "legs" },
  { nameRu: "Плечи", nameEn: "shoulders" },
  { nameRu: "Спина", nameEn: "back" },
];
