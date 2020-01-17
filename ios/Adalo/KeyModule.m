//
//
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "KeyModule.h"
#import <React/RCTLog.h>

@implementation KeyModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)apiKey)
{
  [[NSNotificationCenter defaultCenter]postNotificationName:@"APIKeyNotification"
                                                      object:apiKey];
}


@end
