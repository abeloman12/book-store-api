import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateBookRequestDTO {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsOptional()
    category: string;
    @IsString()
    @IsNotEmpty()
    author: string;
    @IsNumber()
    @IsPositive()
    price: number;
}

export class BookRatingRequestDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: 'rating must be at least 1' })
    @Max(5, { message: 'rating cannot exceed 5' })
    rating: number;
}



export class BookRatingUpdateDTO {
    rating: number;
    numberOfRatings: number;
}