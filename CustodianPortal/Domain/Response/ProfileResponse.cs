namespace CustodianPortal.Domain.Response
{

    public class ProfileResponse
    {

        public string? phone { get; set; }
        public List<Product> products { get; set; }
        public string? id { get; set; }
        public string? email { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? brokerId { get; set; }
        public object? createdBy { get; set; }
        public string? address { get; set; }
        public decimal? walletAmount { get; set; }
        public int? customerCount { get; set; }
        public bool isPasswordUpdated { get; set; }


        public class Product
        {
            public double rate { get; set; }
            public decimal? amount { get; set; }
            public string? id { get; set; }
            public string? name { get; set; }
            public string? updateOption { get; set; }
        }

    }

}
