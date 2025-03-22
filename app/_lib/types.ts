export class Cabin {
  constructor(
    public id: string,
    public name: string,
    public max_capacity: number,
    public regular_price: number,
    public discount: number,
    public image: string,
    public description: string
  ) {}
}

export class Settings {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public minBookingLength: number,
    public maxBookingLength: number,
    public max_guests_per_booking: number,
    public breakfast_price: number
  ) {}
}

export type BookedDates = Date[];

export class Guest {
  constructor(
    public id: string,
    public full_name: string,
    public email: string,
    public nationality: string,
    public country_flag: string,
    public national_id: string
  ) {}
}

export class Booking {
  constructor(
    public id: string,
    public cabin_id: string,
    public guest_id: string,
    public start_date: string,
    public end_date: string,
    public num_nights: number,
    public num_guests: number,
    public cabin_price: number,
    public extras_price: number,
    public total_price: number,
    public status: string,
    public has_breakfast: boolean,
    public is_paid: boolean,
    public observations: string,
    public created_at: Date
  ) {}
}

export type GuestBooking = {
  id: string;
  created_at: Date;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  total_price: number;
  guest_id: string;
  cabin_id: string;
  cabin_price: number;
  extras_price: number;
  status: string;
  has_breakfast: boolean;
  is_paid: boolean;
  observations: string;
  cabins: {
    name: string;
    image: string;
  };
};
