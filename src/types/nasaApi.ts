// type definition for a daily picture from NASA's API
export type TDailyPic = {
  copyright?: string;
  date?: Date;
  explanation?: string;
  hdurl?: string;
  mediaType?: string;
  serviceVersion?: string;
  title?: string;
  url?: string;
};

// type definitions for an image from NASA's EPIC API
export type TEpicImage = {
  identifier?: string;
  caption?: string;
  image?: string;
  version?: string;
  centroidCoordinates?: CentroidCoordinates;
  dscovrJ2000Position?: J2000Position;
  lunarJ2000Position?: J2000Position;
  sunJ2000Position?: J2000Position;
  attitudeQuaternions?: AttitudeQuaternions;
  date?: Date;
  coords?: Coords;
};

type AttitudeQuaternions = {
  q0?: number;
  q1?: number;
  q2?: number;
  q3?: number;
};

type CentroidCoordinates = {
  lat?: number;
  lon?: number;
};

type Coords = {
  centroidCoordinates?: CentroidCoordinates;
  dscovrJ2000Position?: J2000Position;
  lunarJ2000Position?: J2000Position;
  sunJ2000Position?: J2000Position;
  attitudeQuaternions?: AttitudeQuaternions;
};

type J2000Position = {
  x?: number;
  y?: number;
  z?: number;
};
