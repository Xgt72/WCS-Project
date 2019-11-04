import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PlayerBuilding } from "./PlayerBuilding";
import { Indicator } from "./Indicator";
import { PlayerTeacher } from "./PlayerTeacher";
import { PlayerCampusManager } from "./PlayerCampusManager";
import { Activity } from "./Activity";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../constants";


@Entity("mutator")
export class Mutator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    indicator_id: number;

    @Column("float")
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
        mutators.map(mut => { results.push(Mutator.clone(mut)); });
        return results;
    }

    static cloneListWithIndicators(mutators: Mutator[], indicators: Indicator[]): Mutator[] {
        let results: Mutator[] = [];
        let reputationIndicatorId: number = -1;
        let budgetIndicatorId: number = -1;
        let studentsNumberId: number = -1;
        let futureStudentsNumberId: number = -1;
        let forecastSalesTurnoverId: number = -1;

        indicators.map(
            indicator => {
                switch (indicator.name) {
                    case REPUTATION:
                        reputationIndicatorId = indicator.id;
                        break;
                    case BUDGET:
                        budgetIndicatorId = indicator.id;
                        break;
                    case ACTUAL_STUDENTS_NUMBER:
                        studentsNumberId = indicator.id;
                        break;
                    case FUTURE_STUDENTS_NUMBER:
                        futureStudentsNumberId = indicator.id;
                        break;
                    case FORECAST_SALES_TURNOVER:
                        forecastSalesTurnoverId = indicator.id;
                    default:
                        break;
                }
            }
        );
        mutators.map(mut => {
            let mutatorType = mut.name;
            if (mutatorType.search(REPUTATION) != -1) {
                mut.indicator_id = reputationIndicatorId;
            }
            else if (mutatorType.search(BUDGET) != -1) {
                mut.indicator_id = budgetIndicatorId;
            }
            else if (mutatorType.search(ACTUAL_STUDENTS_NUMBER) != -1) {
                mut.indicator_id = studentsNumberId;
            }
            else if (mutatorType.search(FUTURE_STUDENTS_NUMBER) != -1) {
                mut.indicator_id = futureStudentsNumberId;
            }
            else if (mutatorType.search(FORECAST_SALES_TURNOVER) != -1) {
                mut.indicator_id = forecastSalesTurnoverId;
            }
            results.push(Mutator.clone(mut));
        });

        return results;
    }
}