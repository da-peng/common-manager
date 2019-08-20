import {EntityRepository, Repository} from "typeorm";
import {AnchorDailyRank} from "../entity/AnchorDailyRank";

@EntityRepository(AnchorDailyRank)
export class AnchorDailyRankRepository extends Repository<AnchorDailyRank> {

  

}