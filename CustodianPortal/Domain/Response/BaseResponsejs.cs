namespace CustodianPortal.Domain.Response
{
    public class BaseResponsejs<T>
    {
        public bool isSuccess { get; set; }
        public string? errorMsg { get; set; }
        public T? formData { get; set; }

    }
}
