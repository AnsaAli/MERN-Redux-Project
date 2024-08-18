import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
       
    },
    profilePicture:{
        type: String,
        default : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAACUCAMAAACz6atrAAAAMFBMVEXk5ueutLfo6uu9w8WpsLPa3d6xt7q5vsHg4uPU19nR1NbJzc/BxsjX2tzM0NKnrbGND6f1AAADgklEQVR4nO2byXKDMAxAsfCG2f7/bwskoaWTBElGMge/6aHtJW8kbGRLaZpKpVKpVCqVSqVSqVQqlbsDUNrgLdDELqXUudjcSRAal1pvZ7sx29CneI8IAqTgrTV/sNaHrrwdxP7otfuZqXByYfJvzTa7kArKgfts9rCLpeyg/ya24btCcsPXoD1D1xdRCwi1RW4oELmAMdvkbqumHznAqy1MmnLQo561Hc3V6khmC3pqjae6tVqBo2Z0ZVRyI2d0wesEDjDvg/9Ynfd+nBlxMyEqqMHAUTMmKbhF8iJ9Bk4hqYnxtK3M8kmFlqe2VEvygWOGTSOpjrVKV7x0Ulmb2xPpLY5WHB0QL8+5O8hKK+zmMtyCsNvIVzNeVg26DDcru1AhZbgJvxmy3KTjNt3Y7c45vfNayHGTPglyzjEvhPe3rHeW9HuBfmzeEb9QyqlDpK9sYOLXb+Jne97pdEW87m2A/cDJ39dwLmo2NG4d2BWcxoUIb6WqXElDx0qqdwpuDbDipnEdstZJnPs3jSuuFfoTp9ZjgJEcOPl9d5driXJKN6oPaFm1OgvhAUSSm3jhdpSjrFWrsrXx5Jx2BxUmZLFkC7TFsUdV9ahtcqM5zasNRdTW1Xp6Z67fD/+1m76Fzvqx5GQNNF86SKWHfpbEDm+Ga6wNU7GZmoNdF/7NcZlhLB2zHYBxGtoQfAihHSZXfr7sL7DqxO3nRmKrVYzR/bL8tf638PTb8vmu67ds+teZevnNb5kdm0J+a7DcNJj3Q4PPtWpDP0btHEMz9q3/4vXrZ8KQ1PSWj3HU/m5IGpO1AN27vfY0fqZNwnsxNL0/Lz4+4AfBwxa4ni32iF7byaR2eXHmmW0EgdIE3MC+sDxgw8U1OkBmNg+0VyYWugvNFub+KjtADfKSuOoYATlt8M92Vww9IAazeXIhO6+RemWEJ/OkA5HxfkKTdeKHnGkQDPwOF+Q0S1HMXDnxqBl2bxCc4KO2w4tcToeZAmdB8Ju4NCx5K8mZwSNCHTHIaS+TIc7FaT1sG7TFmjExwJKjqPHakHwo15u6YTOEEQjVhfAA3VQCdTVjkXVwgbDhA6f+tBl0O1/kfHAGckqfO5ySB+rLPsr77osZldRr7haoYJLKmrC4AsRK5X6NKBtEqVToccPtIprV0YHz+lf83PcJxAyJa0uB+OIblOJcrVKpVCri/ADiNCtPhz3/zwAAAABJRU5ErkJggg=="
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;