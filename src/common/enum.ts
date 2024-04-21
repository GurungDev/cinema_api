export enum UserEnum {
    CINEMA= "cinema",
    CUSTOMER= "customer",
    ADMIN= "admin",
}

export enum GenreEnum {
  ACTION = "Action",
  COMEDY = "Comedy",
  DRAMA = "Drama",
  FANTASY = "Fantasy",
  HORROR = "Horror",
  MYSTERY = "Mystery",
  ROMANCE = "Romance",
  THRILLER = "Thriller",
  WESTERN = "Western"
 
}

export enum UserServiceEnum {
  CINEMA= "cinemaService",
  CUSTOMER= "customerService",
  ADMIN= "adminService",
}

export enum OtpPurpose  {
  SIGNUP_CINEMA = "signupCinema",
  FORGOT_PASSWORD_CINEMA =  "forgotPasswordCinema",
  SIGNUP_CUSTOMER = "signupCustomer"
};


export enum SeatStatus{
  RESERVED = "reserved",
  BOOKED = "booked"
}


export enum ShowTime  {
  _7Am = "7_am",
  _10Am = "10_am",
  _1pm = "11_pm",
  _4pm = "_4pm",
  _8pm = "_8pm",
  _10pm = "_10pm",
};


export enum RequestDataPaths {
    Body,
    Params,
    Query,
    Files,
  }