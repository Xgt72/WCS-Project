import { PlayerTeacher } from "../entities/PlayerTeacher";
import { Mutator } from "../entities/Mutator";
import { PlayerBuilding } from "../entities/PlayerBuilding";

export let teacherTemplate: PlayerTeacher = new PlayerTeacher(0, "Junior Trainer", 200);
teacherTemplate.mutators = [
    new Mutator("incReputation", 1, 5),
    new Mutator("decBudget", 2, -100)
];

export let classroomTemplate: PlayerBuilding = new PlayerBuilding(0, "classroom", 500, true);
classroomTemplate.mutators = [
    new Mutator("incReputation", 1, 5),
    new Mutator("decBudget", 2, -100)
];

export let parkingTemplate: PlayerBuilding = new PlayerBuilding(0, "parking", 300, true);
parkingTemplate.mutators = [
    new Mutator("incReputation", 1, 2),
    new Mutator("decBudget", 2, -50)
];