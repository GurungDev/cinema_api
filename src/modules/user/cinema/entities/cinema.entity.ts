import { Column, Entity, Index, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../../common/baseEntity/custom-base-entity";
import { generateHash } from "../../../../common/function/hashing";
import MovieEntity from "../../../movie/entities/movie.entity";
import HallEntity from "../../../hall/entities/hall.entity";
import ShowEntity from "../../../show/entities/show.entity";
 
 
@Entity({name: 'Cinema'})
export default class CinemaEntity extends CustomBaseEntity {
    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({ unique: true })
    email: string;

    @Column()
    address: string;

    @Column({default: false})  
    is_approved: boolean;

    @OneToMany(() => MovieEntity, (movie) => movie.cinema)
    movies: MovieEntity[]

    @OneToMany(() => ShowEntity, (show) => show.cinema)
    shows: ShowEntity[]

    @OneToMany(() => HallEntity, (hall) => hall.cinema)
    halls: HallEntity[]

    async verifyPassword(password: string): Promise<boolean>{
        const {hashedValue: hashedPassword} = await generateHash(password, this.salt);
        return this.password === hashedPassword;
    }
    async setPassword(password: string) {
        const { hashedValue: hashedPassword, salt } = await generateHash(password);
        this.password = hashedPassword;
        this.salt = salt;
      }
}