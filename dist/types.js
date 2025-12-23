"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPCBaseStat = exports.NPCOrGamerObjectsData = exports.exerciseTypes = exports.UserType = exports.raitingExerciseArr = exports.coachesFilterElements = exports.filterElements = exports.mainMuscleGrourArr = void 0;
exports.mainMuscleGrourArr = [
    { nameRu: "Бицепс", nameEn: "biceps" },
    { nameRu: "Трицепс", nameEn: "triceps" },
    { nameRu: "Грудь", nameEn: "chest" },
    { nameRu: "Ноги", nameEn: "legs" },
    { nameRu: "Плечи", nameEn: "shoulders" },
    { nameRu: "Спина", nameEn: "back" },
];
exports.filterElements = [
    { nameEn: "popular", nameRu: "По популярности", increment: true },
    { nameEn: "raiting", nameRu: "По увеличению рейтинга", increment: true },
    { nameEn: "raiting", nameRu: "По уменьшению рейтинга", increment: false },
    { nameEn: "name", nameRu: "По имени", increment: true },
];
exports.coachesFilterElements = [
    { nameEn: "popular", nameRu: "По популярности", increment: true },
    { nameEn: "workoutsArr", nameRu: "Количество тренировок (сначала больше)", increment: false },
    { nameEn: "workoutsArr", nameRu: "Количество тренировок (сначала меньше)", increment: true },
    { nameEn: "name", nameRu: "По имени", increment: true },
];
exports.raitingExerciseArr = [
    { nameRu: "1", nameEn: "1" },
    { nameRu: "2", nameEn: "2" },
    { nameRu: "3", nameEn: "3" },
    { nameRu: "4", nameEn: "4" },
    { nameRu: "5", nameEn: "5" },
];
var UserType;
(function (UserType) {
    UserType["Admin"] = "admin";
    UserType["Coach"] = "coach";
    UserType["User"] = "user";
})(UserType || (exports.UserType = UserType = {}));
[];
exports.exerciseTypes = [
    { nameRu: "Бицепс", nameEn: "biceps" },
    { nameRu: "Трицепс", nameEn: "triceps" },
    { nameRu: "Грудь", nameEn: "chest" },
    { nameRu: "Ноги", nameEn: "legs" },
    { nameRu: "Плечи", nameEn: "shoulders" },
    { nameRu: "Спина", nameEn: "back" },
];
exports.NPCOrGamerObjectsData = {
    gamer: {
        heightChanks: 5,
        widthChanks: 3,
        heightPixels: 40,
        widthPixels: 24,
    },
    orc3: {
        heightChanks: 6,
        widthChanks: 4,
        heightPixels: 48,
        widthPixels: 32,
    },
};
exports.NPCBaseStat = {
    orc3: {
        HP: 100,
        armour: 0.1,
        damage: 20,
        XP: 20,
    },
    gamer: {
        HP: 100,
        armour: 0.2,
        damage: 10,
        XP: 20,
    },
};
