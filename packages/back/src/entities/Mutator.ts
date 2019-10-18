import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PlayerBuilding } from "./PlayerBuilding";
import { Indicator } from "./Indicator";
import { PlayerTeacher } from "./PlayerTeacher";
import { PlayerCampusManager } from "./PlayerCampusManager";
import { Activity } from "./Activity";

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

    @ManyToOne(type => PlayerTeacher, playerTeacher => playerTeacher.mutators, { onDelete: 'CASCADE' })
    playerTeacher: PlayerTeacher;

    @ManyToOne(type => PlayerCampusManager, playerCampusManager => playerCampusManager.mutators, { onDelete: 'CASCADE' })
    playerCampusManager: PlayerCampusManager;

    @ManyToOne(type => Activity, activity => activity.mutators, { onDelete: 'CASCADE' })
    activity: Activity;

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
        let reputationIndicatorId: number = -1;
        let budgetIndicatorId: number = -1;
        // console.log("indicators in mutator: ", indicators);
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