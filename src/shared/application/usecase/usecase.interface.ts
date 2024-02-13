import { type Either } from "@/shared/domain/validators/either";

export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<Either<Error, Output>>;
}
