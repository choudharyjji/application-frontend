const GENDER = {
  MALE: 'male',
  FEMALE: 'female',

  getOptions() {
    return [
      {
        value: this.MALE,
        label: 'Male',
      },
      {
        value: this.FEMALE,
        label: 'Female',
      },

    ];
  },
};


export default GENDER;
