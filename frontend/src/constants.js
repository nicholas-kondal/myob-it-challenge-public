export const questionMapping = {
  ratingType: "Question Type; ",
  compulsoryType: "Question Setting: ",
  conditionalType: "Conditional On: ",
  conditionalValue: "Show Question if Match: ",
  questionTopic: "Question Topic: ",
};

export const questionTypeMapping = {
  starRating: "Star Rating",
  textRating: "Written - Short",
};

export const compulsoryTypeMapping = {
  compulsory: "Compulsory",
  standard: "Optional",
  conditional: "Conditional",
};

export const conditionalTypeMapping = {
  productType: "Product ID",
  shippingAddress: "by Shipping Address",
};

export const questionTopicMapping = {
  overallSatisfaction: "Overall Satisfaction",
  productRating: "Product Satisfaction",
  serviceRating: "Service Satisfaction",
  companyRating: "Company Review",
  comments: "Additional Comments",
};

export const conditionalValueMapping = {
  prod123: "prod #123",
  prod124: "prod #124",
  prod125: "prod #125",
  prod126: "prod #126",
  dom: "Domestic",
  int: "International",
};

export const feedbackResultMapping = {
  overall: "Overall Satisfaction Rating",
  comments: "How satisfied were you?",
};

export const questionKeyMapping = {
  ratingType: questionTypeMapping,
  compulsoryType: compulsoryTypeMapping,
  conditionalType: conditionalTypeMapping,
  questionTopic: questionTopicMapping,
  conditionalValue: conditionalValueMapping,
};
