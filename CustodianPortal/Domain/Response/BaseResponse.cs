namespace CustodianPortal.Domain.Response
{
    public class BaseResponse<T>
    {
        public T? data { get; set; }
        public string? status { get; set; }
        public string? message { get; set; }
        public string? dataFormat { get; set; }
        public List<string>? errors { get; set; }
    }
}
