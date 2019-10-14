import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PlayerBuilding } from "./PlayerBuilding";
import { Indicator } from "./Indicator";
import { TeacherActivitiesCalendar } from "./TeacherActivitiesCalendar";
import { PlayerTeacher } from "./PlayerTeacher";

@Entity("mutator")
export class Mutator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    indicator_id: number;

    @Column()
    value: number;


    @ManyToOne(type => PlayerBuilding, playerBuilding => playerBuilding.mutators, { onDelete: 'CASCADE' })
    playerBuilding: PlayerBuilding;

    @ManyToOne(type => TeacherActivitiesCalendar, teacherActivitiesCalendar => teacherActivitiesCalendar.mutators, { onDelete: 'CASCADE' })
    teacherActivitiesCalendar: TeacherActivitiesCalendar;

    @ManyToOne(type => PlayerTeacher, playerTeacher => playerTeacher.mutators, { onDelete: 'CASCADE' })
    playerTeacher: PlayerTeacher;


    constructor(name: string, indicator_id: number, value: number) {
        this.name = name;
        this.indicator_id = indicator_id;
        this.value = value;
    }

    static clone(mutator: Mutator): Mutator {
        return new Mutator(mutator.name, mutator.indicator_id, mutator.value);
    }

    static cloneList(mutators: Mutator[]): Mutator[] {
        let results: Mutator[] = [];
        mutators.map(mut => {results.push(Mutator.clone(mut));});
        return results;
    }

    static cloneListWithIndicators(mutators: Mutator[], indicators: Indicator[]): Mutator[] {
        let results: Mutator[] = [];
        let reputationIndicatorId: number = null;
        let budgetIndicatorId: number = null;
        indicators.map(
            indicator => {
                switch (indicator.name) {
                    case "reputation":
                        reputationIndicatorId = indicator.id;
                        break;
                    case "budget":
                        budgetIndicatorId = indicator.id;
                        break;
                    default:
                        break;
                }
            }
        );
        mutators.map(mut => {
            let mutatorType = mut.name;
            if (mutatorType.search("Reputation") != -1) {
                mut.indicator_id = reputationIndicatorId;
            }
            else if (mutatorType.search("Budget") != -1) {
                mut.indicator_id = budgetIndicatorId;
            }
            results.push(Mutator.clone(mut));
        });

        return results;
    }
}