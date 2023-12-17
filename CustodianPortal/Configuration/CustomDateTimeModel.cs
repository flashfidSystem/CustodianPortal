//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.ModelBinding;
//using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
//using Microsoft.Extensions.Options;
//using System;
//using System.Globalization;
//namespace CustodianPortal.Configurations
//{

//    public class CustomDateTimeModelBinderProvider : IModelBinderProvider
//    {
//        public IModelBinder GetBinder(ModelBinderProviderContext context)
//        {
//            if (context.Metadata.UnderlyingOrModelType == typeof(DateTime))
//            {
//                return new BinderTypeModelBinder(typeof(CustomDateTimeModelBinder));
//            }

//            return null;
//        }
//    }

//    public class CustomDateTimeModelBinder : IModelBinder
//    {
//        private readonly IModelBinder fallbackBinder = new DefaultModelBinder();

//        public Task BindModelAsync(ModelBindingContext bindingContext)
//        {
//            if (bindingContext.ModelType == typeof(DateTime))
//            {
//                var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
//                if (valueProviderResult != ValueProviderResult.None && DateTime.TryParseExact(valueProviderResult.FirstValue, "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out var result))
//                {
//                    bindingContext.Result = ModelBindingResult.Success(result);
//                    return Task.CompletedTask;
//                }
//            }

//            return fallbackBinder.BindModelAsync(bindingContext);
//        }
//    }
//}
