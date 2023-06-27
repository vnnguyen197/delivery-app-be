enum GENDER {
  MALE = "Nam",
  FEMALE = "Nữ",
  OTHER= "Khác"
}

enum ROLE {
  USER = 'user',
  SHIPPER = 'shipper'
}

enum STATUS {
  WAITING = 'WAITING',
  NEW = 'NEW',
  SHIPPING = 'SHIPPING',
  DONE = 'DONE',
  CANCEL = 'CANCEL',
}

enum STATUS_ORDER_ADMIN {
  NEW = 'NEW',
  CANCEL = 'CANCEL',
}

export { GENDER, ROLE, STATUS, STATUS_ORDER_ADMIN };