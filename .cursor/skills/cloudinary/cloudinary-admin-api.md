# Admin API reference


[search_response_link]: #search_for_resources_sample_response

The Admin API is a **rate-limited** RESTful API that provides full control of all media assets (resources), upload presets, named transformations and other product environment entities. 
[Cloudinary's backend SDKs](backend_sdks) wrap these REST APIs, handle authentication, and enable you to perform these methods using your preferred programming language or framework. This reference provides both SDK and REST/cURL syntax and examples for each endpoint method.
> **See also**:
>
> For more on managing and analyzing your assets, refer to the [Manage and analyze](asset_management) guide.

> **TIP**:
>
> :title=Tips

> * You can open the Media Library to confirm that changes from your Admin API request, such as creating a new folder, applying tags, adding metadata, or setting moderation status, appear as expected. For more information, see the [Media Library for Developers](media_library_for_developers) page.  

> * Using [MediaFlows](https://console.cloudinary.com/mediaflows), Cloudinary’s drag-and-drop workflow builder for image and video, enables users to easily call admin API methods – including getting tags, contextual metadata, and usage data – in a low-code implementation. See MediaFlow’s documentation on admin API methods [here](mediaflows_block_reference#cloudinary_apis).

> * You can also browse and search assets directly from your IDE using the [Cloudinary VS Code Extension](cloudinary_vscode_extension). This eliminates context-switching between your code editor and browser, helping you stay focused on development.

## Overview

By default, the API endpoints use the following format:

`https://api.cloudinary.com/v1_1/:cloud_name/:action`

For example, to list all video assets in the `cld-docs` product environment:

```
GET https://api.cloudinary.com/v1_1/cld-docs/resources/video
```

The API uses **Basic Authentication** over secure HTTP. Your Cloudinary **API Key** and **API Secret** (which can be found on the [API Keys](https://console.cloudinary.com/app/settings/api-keys) page of your Cloudinary Console Settings) are used for the authentication.

You can experiment with returning a list of the images in your own Cloudinary product environment by replacing the `API_KEY`, `API_SECRET`, and `CLOUD_NAME` in the cURL command below:

```
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/resources/image
```
> **INFO**: Cloudinary may add more fields to API responses and notifications in the future, so please ensure that your response parsing remains forward compatible and won't break as a result of unknown fields.

### Using Postman for Admin REST API calls
Take advantage of our [Cloudinary Postman Collections](https://www.postman.com/cloudinaryteam/workspace/programmable-media/overview?ctx=documentation) to experiment with our REST APIs and view the responses before adding them to your own code. 

Run in Postman

For details on setting up your own fork of our collections and configuring your Postman environment with your Cloudinary product environment credentials, see [Using Cloudinary Postman collections](using_cloudinary_postman_collections).
### Using SDKs with the Admin API

Our [backend SDK libraries](cloudinary_sdks) provide a wrapper for the Admin API, enabling you to use your native programming language of choice. When using an SDK, request building and authentication are handled automatically, and the JSON response is parsed and returned. 

For example, you can use the following SDK command to return a listing of all image (the default `resource_type`) assets:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources

|ruby
result = Cloudinary::Api
.resources

|php_2
$result = $api
->assets();

|python
result = cloudinary.api\
.resources()

|nodejs
cloudinary.v2.api
.resources()
.then(result=>console.log(result)); 

|java
result = api.resources(ObjectUtils.emptyMap());

|csharp
result = cloudinary.ListResources();

|go
resp, err := cld.Admin.Assets(ctx, admin.AssetsParams{})

|cli
cld admin resources

```
### Using the CLI to access the Admin API

You can use the Cloudinary CLI (Command Line Interface) to interact with the Admin API.  This can provide an easy way to add automation to your workflows and manage your assets without the need for a formal coding environment or having to access your Cloudinary Console. 

You can find instructions for setting up and using the CLI in the [CLI reference](cloudinary_cli).
### Error handling

The Admin API returns the status of requests using HTTP status codes:

**200**: OK | Success. 
**400**: Bad request. 
**401**: Authorization required. 
**403**: Not allowed. 
**404**: Not found. 
**409**: Already exists. 
**420**: Rate limited. 

The SDKs report errors by raising applicative exceptions.
Additionally, an informative JSON message is returned. For example:

```json
{ "error": { "message": "Resource not found - 5traNge_nam3" } }
```

### Usage limits

You can use the Admin API quite extensively, but it's a rate limited API. The specific limits depend on the [plan](https://cloudinary.com/pricing) your account is registered to. 

You can check your current plan and limits in [Console Settings](programmable_media_asset_usage_data#usage_limits_and_notifications) or programmatically via the [usage](#usage) method.

If you require more flexible limits, don't hesitate to contact us.

> **NOTE**: This API rate limit refers only to Admin API requests, and not to requests that use the [Upload API](image_upload_api_reference), which isn't rate-limited. In some cases, you may be able to use certain methods of the Upload API to achieve some administration goals. For example, you can modify or remove tags for one or multiple resources using the [tags](image_upload_api_reference#tags) method. You can modify many attributes of an individual resource using the [explicit](image_upload_api_reference#explicit) method, and you can return most details about a single (original) resource in response to any [upload](image_upload_api_reference#upload) or [explicit](image_upload_api_reference#explicit) method call.

For each Admin API call, standard HTTP headers are returned with details on your current usage statistics, including your per-hour limit, remaining number of actions and the time the hourly count will be reset.

The header might look something like this:

```
X-FeatureRateLimit-Limit: 500
X-FeatureRateLimit-Remaining: 499
X-FeatureRateLimit-Reset: Wed, 03 Oct 2012 08:00:00 GMT
```

You can use the SDKs to retrieve this data as follows:

```multi
|ruby
result = Cloudinary::Api.resources
result.rate_limit_allowed
=> 500
$ result.rate_limit_remaining
=> 499
$ result.rate_limit_reset_at
=> 2019-10-03 10:00:00 +0200


|php_2
$result = $api->assets();
var_dump($result->rateLimitAllowed);
php > int(500)
var_dump($result->rateLimitRemaining);
php > int(499)
var_dump($result->rateLimitResetAt);
php > int(1570089600)

|python
result = cloudinary.api.resources()
result.rate_limit_allowed
>>>500
result.rate_limit_remaining
>>>499
result.rate_limit_reset_at
>>>(2019, 10, 3, 08, 0, 0, 0, 1, -1)

|nodejs
cloudinary.v2.api
.resources()
.then(result=>console.log(result.rate_limit_allowed,
              result.rate_limit_remaining,
              result.rate_limit_reset_at));

> 500 499 Sun, 03 Oct 2019 08:00:00 GMT

|java
ApiResponse result = api.resources(ObjectUtils.emptyMap());
System.out.println(result.apiRateLimit().getLimit());
=> 500
System.out.println(result.apiRateLimit().getRemaining());
=> 499
System.out.println(result.apiRateLimit().getReset());
=> 2019-10-03 10:00:00 +0200

|csharp
var result = cloudinary.ListResources();
result.Limit
// returns 500
result.Remaining
// returns 499
result.Reset
//returns  2019-10-03 10:00:00 +0200

|go
Not supported by this SDK

```

> **TIP**: You can also retrieve rate limits details as well as transformation, bandwidth, and storage limits, and a variety of additional product environment usage data with the [GET /usage](#usage) method.

### Pagination

The GET methods of the API return a limited set of results, ordered by the creation time of the relevant entities. You can control the number of results returned in a single request by specifying the `max_results` parameter. The default is 10 for most methods. There is also a maximum number of results you can request for a single API call (either 100 or 500 as documented for each of the relevant methods). DELETE methods also operate in chunks. 

When a GET request has more results to return than `max_results` or when a DELETE request has more than 1000 entities to delete, the `next_cursor` value is returned as part of the response. You can then specify this cursor value as the `next_cursor` parameter of the following GET or DELETE request. For example, this enables you to iterate through the full list of uploaded resources, transformations, or tags in your product environment or to delete an entire set of entities that matches your deletion request.

### EU or AP data centers and endpoints	(premium feature)

> **NOTE**: This is a premium feature that is supported only for our [Enterprise plans](https://cloudinary.com/pricing#pricing-enterprise) and must be arranged when the account is created. [Contact our Enterprise support and sales team](https://cloudinary.com/contact?plan=enterprise) or your CSM for more information.

By default, Cloudinary accounts use US-based data centers. In these cases, the endpoint format is as shown at the beginning of this [Overview](#overview).

If the majority of your users are located in Europe or Asia, Cloudinary can set up your account to use our Europe (EU) or Asia Pacific (AP) data center. In that case, your endpoints will take the form: 

`https://api-eu.cloudinary.com/v1_1/:cloud_name/:action`

OR

`https://api-ap.cloudinary.com/v1_1/:cloud_name/:action`

> **TIP**: When using the Cloudinary SDKs you need to set the `upload_prefix` [configuration parameter](cloudinary_sdks#configuration_parameters).

## config

Enables you to get the details on your product environment configuration and current settings including information on the `folder_mode` (dynamic or fixed).

Method | Description
---|---
GET <code class="code-method">/config | [Lists product environment config details.](#get_product_environment_config_details)

---
### Get product environment config details

#### Syntax
`GET /config `

```multi
|php_2
$response = $api->config($options = []);

|python
cloudinary.api.config()

|cli
cld admin config
```

#### Optional parameters
Parameter | Type | Description
---|---|---
settings | Boolean |  Whether to include the current configuration settings in the response. Currently returns information on the `folder_mode` (dynamic or fixed). **Default**: `false`

#### Examples
Return the product environment configuration including settings info:

```multi
|python
cloudinary.api.config(settings=True)

|cli
cld admin config settings=true

|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/config?settings=true
```

#### Sample response
The response contains an object with detailed product environment information.

```json
{ 
  "cloud_name": "cld-docs",
  "created_at": "2023-05-08T08:20:11Z",
  "settings": {
    "folder_mode": "dynamic"
  },
}
```

## folders

Run in Postman
Learn more about running Postman collections

Enables you to manage your product environment's asset folders.

> **NOTE**: For product environments using the legacy fixed folder mode, keep in mind that this API relates to folders as part of the public ID paths of assets, which are the same as the folder names or path structure where you've stored those assets.

Method | Description
---|---
GET<code class="code-method">/folders | [Lists all the root folders.](#get_root_folders)
GET<code class="code-method">/folders/:folder | [Lists the name and full path of all subfolders of a specified folder.](#get_subfolders)
GET<code class="code-method">/folders/search | [Lists the folders that match the specified search expression.](#search_folders)
POST<code class="code-method">/folders/:folder | [Creates a new folder.](#create_folder)
PUT<code class="code-method">/folders/:folder | [Updates a folder.](#update_folder)
DELETE<code class="code-method">/folders/:folder | [Deletes a folder.](#delete_folder)

---

### Get root folders

Lists all the root folders. Limited to 2000 results.

#### Syntax
`GET /folders`

```multi
|ruby
Cloudinary::Api.root_folders

|php_2
$api->rootFolders();

|python
cloudinary.api.root_folders()

|nodejs
cloudinary.v2.api.root_folders().then(callback);

|java
api.rootFolders(ObjectUtils.emptyMap());

|csharp
cloudinary.RootFolders();

|go
resp, err := cld.Admin.RootFolders(ctx, admin.RootFoldersParams{})

|cli
cld admin root_folders
```

#### Sample response
The response contains an array of all the root folders.

```json
{
    "folders": [
      {
        "name": "cloud",
        "path": "cloud",
        "external_id": "c827a481780998f26ebda3f13559c1ac86"
      }, 
      {
        "name": "brooks",
        "path": "brooks",
        "external_id": "b123jkl7890ak2389jipqwiuenklvwqei6"
      }   
    ],
    "next_cursor": null,
    "total_count": 2
}
```
---

### Get subfolders

Lists the name and full path of all subfolders of a specified parent folder. Limited to 2000 results.

#### Syntax
`GET /folders/:folder`

```multi
|ruby
Cloudinary::Api.subfolders(folder, options = {})

|php_2
$api->subfolders($folder, $options = []);

|python
cloudinary.api.subfolders(folder, **options)

|nodejs
cloudinary.v2.api.sub_folders(folder, options).then(callback);

|java
api.subfolders(String folder, Map options);

|csharp
cloudinary.SubFolders(folderParams params);

|go
resp, err := cld.Admin.SubFolders(ctx, admin.SubFoldersParams{})

|cli
cld admin subfolders (folder) 
```

#### Required parameters
Parameter | Type | Description
---|---|---
folder | String | The full path of the parent folder whose subfolders you want to return.

#### Optional parameters
Parameter | Type | Description
---|---|---
max\_results | Integers |  Maximum number of results to return (up to 500). **Default**: `10`. 
next\_cursor | String | When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of a following request.

#### Examples
List all subfolders of the 'product/shoe' folder:

```multi
|ruby
result = Cloudinary::Api
.subfolders("product/shoe")

|php_2
$result = $api
->subfolders("product/shoe");

|python
result = cloudinary.api\
.subfolders("product/shoe")

|nodejs
cloudinary.v2.api
.sub_folders("product/shoe")
.then(result=>console.log(result)); 

|java
result = api
.subfolders("product/shoe", ObjectUtils.emptyMap());

|csharp
result = cloudinary
.SubFolders("product/shoe");

|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/folders/product/shoe

|go
resp, err := cld.Admin.SubFolders(ctx, admin.SubFoldersParams{"product/shoe"})

|cli
cld admin subfolders "product/shoe"
```

#### Sample response
The response contains an array of all the subfolders of the specified folder.

```json
{
    "folders": [
      {
        "name": "red",
        "path": "product/shoe/red",
        "external_id": "c827a481780998f26ebda3f13559c1ac86"
      }, 
      {
        "name": "white",
        "path": "product/shoe/white",
        "external_id": "b123jkl7890ak2389jipqwiuenklvwqei6"
      }   
    ],
    "next_cursor": null,
    "total_count": 2
 }

```

---

### Search folders

Lists the folders that match the specified search expression. Limited to 2000 results.

#### Syntax
`GET /folders/search`

```multi
|ruby 
result = Cloudinary::search_folders.execute
  
|php_2
$result = $cloudinary->searchFolders()->execute();

|python
result = cloudinary.SearchFolders().expression().execute()

|nodejs
cloudinary.v2.searchFolders.execute().then(callback);
  
|java
result = cloudinary.searchFolders().execute();

|csharp
SearchResult result = cloudinary.SearchFolders().Execute();

|go
resp, err := cld.Admin.SearchFolders(ctx, search.Query{})

|cli
cld search_folders
```

#### Optional parameters
All parameters are optional. If you don't pass any parameters, the method returns the 50 most recently created folders in descending order of creation time (most recent first).

Parameter | Type | Description
---|---|---
expression | String | The (Lucene-like) string expression specifying the search query. If you don't pass this parameter, the method returns all folders (up to `max_results`). To learn about search queries and operators, see the [search expressions](search_expressions) guide. For details on available expression fields, see the [Folder expression fields](#search_folders_expression_fields) reference below.
sort_by  | String[] |  An array of string values representing a key value pair, where the key is the field to sort by and the value is the direction. Valid sort directions are `asc` or `desc`. If this parameter isn't passed, the results are sorted by descending creation date. If you specify more than one `sort_by` parameter, results are sorted according to the order of the fields you specify. 
max\_results | Integer | Maximum number of folders to return (maximum=`500`). **Default**: `50`. 
next\_cursor | String |  When a request has more results to return than `max_results`, the method returns the `next_cursor` value as part of the response. You can then specify this value as the `next_cursor` parameter of the following request.

##### Folder expression fields 

You can use the following fields in a folder search expression. 

The operators that you can use with a field depend on the field's value type. For details, see [Field types and supported operators](search_expressions#field_operators). 

> **See also**:
>
> For a detailed overview of search expressions and operators, see the [Search expressions](search_expressions) guide.

                                                                          
Field Name | Type | Examples | Details
---|---|---|---
`name` | String | name=test/sample // exact folder namename:sample // all folder names containing the token `sample`name:"my folder with spaces" // folder name that contains spaces| The folder name (or a token of the folder name) to find.
`path` | String | path=test/sample // exact folder pathpath:sample // all folder paths containing the token `sample`path:"my folder with spaces" // folder path with a folder that contains spaces| The path (or part of the path) of the folders to find.
`created_at` | Date |created\_at:["2022-11-12T12:00:00Z" TO 1w]created\_at:[4w TO 1w]created\_at>10dcreated\_atcreated\_atcreated\_at**Note**: If you include the time, enclose the entire date and time in quotation marks.
`updated_at` | Date | updated\_at:["2022-10-22T12:00:00Z" TO "2022-11-22T12:00:00Z"]updated\_at>"2022-10-22T12:00:00Z" | The date when the folder was last renamed or moved. **Note**: If you include the time, enclose the entire date and time in quotation marks.Not supported for product environments using the legacy fixed folder mode, since renaming and moving folders aren't supported in that mode.
`id` | String | id=abcd10ef1234ab1c678def9a0c123| The immutable `external_id` of the folder. The [get root folders](admin_api#get_root_folders), [get subfolders](admin_api#get_subfolders), and [search folders](admin_api#search_folders) methods return the folder's `external_id`.

#### Examples
Find folders with a name that includes a [token](search_expressions#string_operators_exact_or_tokenized_searches) of `folder` in a folder path that includes a [token](search_expressions#string_operators_exact_or_tokenized_searches) of `my_parent`, and was created in the past 4 weeks. Sort the list in ascending alphabetical order by folder name and limit the initial set of returned results to the first 10 folders:

```multi
    |ruby
    result = Cloudinary::SearchFolders
      .expression('name:folder AND path:my_parent AND created_at>4w')
      .sort_by('name: asc')
      .max_results(10)
      .execute

    |php_2
    $result = $cloudinary->searchFolders()
      ->expression('name:folder AND path:my_parent AND created_at>4w')
      ->sort_by('name: asc')
      ->maxResults(10)
      ->execute();

  |python
  result = cloudinary.SearchFolders()\
    .expression("name:folder AND path:my_parent AND created_at>4w")\
    .sort_by("name: asc")\
    .max_results("10")\
    .execute()

  |nodejs
  cloudinary.v2.searchFolders
    .expression('name:folder AND path:my_parent AND created_at>4w')
    .sort_by('name: asc')
    .max_results(10)
    .execute()
    .then(result=>console.log(result));

  |java
  result = cloudinary.searchFolders()
    .expression("name:folder AND path:my_parent AND created_at>4w")
    .sort_by("name: asc")
    .maxResults(10)
    .execute();

  |csharp
  SearchResult result = cloudinary.SearchFolders()
    .Expression("name:folder AND path:my_parent AND created_at>4w")
    .SortBy("name: asc")
    .MaxResults(10)
    .Execute();

  |go
  resp, err := cld.Admin.SearchFolders(ctx, search.Query{
        Expression: "name:folder AND path:my_parent AND created_at>4w",
        SortBy: "name: asc",
        MaxResults: 10})

  |curl
  curl \
    -H "Content-Type: application/json" \
    -d '{
          "expression": "name:folder AND path:my_parent AND created_at>4w",
          "sort_by": [{"name": "asc"}],
          "max_results": 10
        }' \
    https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/folders/search

  |cli
  cld search_folders "name:folder AND path:my_parent AND created_at>4w" -s name asc -n 10
  ```

#### Sample response
A listing of all folders that match the search expression criteria according to the requested sorting order.

```json
{
    "total_count": 14,
    "time": 1136,
    "next_cursor": "0a37f8c9f65e79c1cbe782d47987ed108d9f9e0dad4b0666adbfa4eac9a634191996204a0ef84ce7b3e06836a451d27959109eef3ad78ecefdbddc77094e45c5",
    "folders": [
        {
            "name": "1_folder_param",
            "path": "my_parent/1_folder_param",
            "created_at": "2024-12-16T11:17:31+00:00",
            "external_id": "c7c08f8ecf093353d6693d2ea3123967c7"
        },
        {
            "name": "a_folder_param",
            "path": "my_parent/a_folder_param",
            "created_at": "2024-12-16T11:08:32+00:00",
            "external_id": "c7c08b7365092482c1125ba56d89ab8779"
        },
        ...
        ...
        ...
        {
            "name": "different_folder",
            "path": "my_parent/different_folder",
            "created_at": "2024-11-25T09:22:31+00:00",
            "external_id": "beab33a86b095abe82dfb27d0632e4cc60"
        }
    ]
}

```

---
### Create folder

Creates a new empty asset folder.

#### Syntax
`POST /folders/:folder`

```multi
|ruby
Cloudinary::Api.create_folder(folder)

|php_2
$api->createFolder($folder);

|python
cloudinary.api.create_folder(folder)

|nodejs
cloudinary.v2.api.create_folder(folder).then(callback);

|java
api.createFolder(String folder, Map options); 

|csharp
cloudinary.CreateFolder(folder);

|go
resp, err := cld.Admin.CreateFolder(ctx, admin.CreateFolderParams{})

|cli
cld admin create_folder $folder
```

#### Required parameters
Parameter | Type | Description
---|---|---
folder | String | The full path of the new asset folder.

#### Examples
Create a new folder called 'test' as a subfolder of the parent folder 'product' ('product/test'):

```multi
|ruby
result = Cloudinary::Api
.create_folder("product/test")

|php_2
$result = $api
->createFolder("product/test");

|python
result = cloudinary.api\
.create_folder("product/test")

|nodejs
cloudinary.v2.api
.create_folder("product/test")
.then(result=>console.log(result)); 

|java
result = api.createFolder("product/test", ObjectUtils.emptyMap());

|csharp
result = cloudinary.CreateFolder("product/test");

|go
resp, err := cld.Admin.CreateFolder(ctx, admin.CreateFolderParams{Folder: "product/test"})

|curl
curl \
  -X POST
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/folders/product/test

|cli
cld admin create_folder "product/test"
```

#### Sample response
```json
{
    "success": true,
    "path": "product/test",
    "name": "test"
}
```

---

### Update folder

Updates an existing asset folder.

> **NOTE**: Not supported for product environments using the legacy fixed folder mode.

#### Syntax
`PUT /folders/:folder`

```multi
|php_2
renameFolder(string $fromPath, string $toPath, array $options = [])
```

#### Required parameters
Parameter | Type | Description
---|---|---
folder | String | The full path of an existing asset folder.
to_folder | String | The full path of the new asset folder. Updates as follows:Changing the last component of the path is equivalent to renaming the folder (e.g., `hats/caps` to `hats/berets`).Changing the path without changing the last component is equivalent to moving the existing folder to another path (e.g., `hats/caps` to `baseball/caps`)Changing the path and the last component is equivalent to moving and renaming (e.g., `hats/caps` to `baseball/berets`).

#### Examples
Update a folder called 'product/test' to 'product1/test1':

```multi
|curl
curl \
  -X POST
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/folders/product/test?to_folder="product1/test1"

|php_2
$result = $adminApi->renameFolder(
    fromPath: 'product/test',
    toPath: 'product1/test1'
);
```

#### Sample response
```json
{
  "from": {
    "name": "test",
    "path": "product/test",
  },
  "to": {
    "name": "test1",
    "path": "product1/test1",
  }
}
```

---

### Delete folder

Deletes an empty folder. 

> **TIP**:
>
> :title=Tips
> The folder must be empty before you can delete it.

> * To find all assets currently in a folder:

>   * In [dynamic folder mode](folder_modes), use the [get resources by asset folder](#get_resources_by_asset_folder) method.

>   * In [fixed folder mode](folder_modes), use the [get resources](admin_api#get_resources) method with the `prefix` parameter to find all assets with a specified path in the public ID.

> * To move assets out of a folder:

>   * In [dynamic folder mode](folder_modes), use the [update](#update_details_of_an_existing_resource) method with the `asset_folder` parameter to change the asset's asset folder. 

>   * In [fixed folder mode](folder_modes), use the [rename](image_upload_api_reference#rename) method to change the public ID path.

> * To delete assets: use the [Delete resources](#delete_resources) method.

#### Syntax
`DELETE /folders/:folder`

```multi
|ruby
Cloudinary::Api.delete_folder(folder)

|php_2
$api->deleteFolder($folder);

|python
cloudinary.api.delete_folder(folder)

|nodejs
cloudinary.v2.api.delete_folder(folder).then(callback);

|java
api.deleteFolder(String folder, Map options); 

|csharp
cloudinary.DeleteFolder(folder);

|go
resp, err := cld.Admin.DeleteFolder(ctx, admin.DeleteFolderParams{})

|cli
cld admin delete_folder (folder)
```

#### Required parameters
Parameter | Type | Description
---|---|---
folder | String | The full path of the empty folder to delete.

#### Optional parameters
Parameter | Type | Description
---|---|---
skip_backup | Boolean | Allows deletion of the folder even if it contains backed up assets, which aren't visible when viewing the folder in the [Media Library](https://console.cloudinary.com/console/media_library/search). Default: `false`

#### Examples
Delete a folder called 'test' which is a subfolder of the root folder 'product' ('product/test'):

```multi
|ruby
result = Cloudinary::Api
.delete_folder("product/test")

|php_2
$result = $api
->deleteFolder("product/test");

|python
result = cloudinary.api\
.delete_folder("product/test")

|nodejs
cloudinary.v2.api
.delete_folder("product/test")
.then(result=>console.log(result)); 

|java
result = api
.deleteFolder("product/test", ObjectUtils.emptyMap());

|csharp
result = cloudinary
.DeleteFolder("product/test");

|go
resp, err := cld.Admin.DeleteFolder(ctx, admin.DeleteFolderParams{Folder: "product/test"})

|curl
curl \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/folders/product/test

|cli
cld admin delete_folder "product/test"

```

#### Sample response
```json
{
    "deleted": [
        "product/test"
    ]
}
```

## metadata_fields

Run in Postman
Learn more about running Postman collections

Enables you to manage the metadata fields available for your product environment. 

Method | Description
---|---
GET<code class="code-method">/metadata\_fields | [Lists all metadata field definitions.](admin_api#get_metadata_fields)
GET<code class="code-method">/metadata\_fields/:external\_id | [Returns a single metadata field definition by external ID.](admin_api#get_a_metadata_field_by_external_id)
POST<code class="code-method">/metadata\_fields | [Creates a new metadata field definition.](admin_api#create_a_metadata_field)
POST<code class="code-method">/metadata\_fields/datasource/search | [Searches for datasource values across all metadata fields.](admin_api#search_metadata_field_datasource)
POST<code class="code-method">/metadata\_fields/:external\_id/datasource\_restore | [Restores entries in a metadata field datasource.](admin_api#restore_entries_in_a_metadata_field_datasource)
POST<code class="code-method">/metadata\_fields/:external\_id/datasource/order | [Order a metadata field datasource.](admin_api#order_a_metadata_field_datasource)
PUT<code class="code-method">/metadata\_fields/:external\_id | [Updates a metadata field definition by external ID.](admin_api#update_a_metadata_field_by_external_id)  
PUT<code class="code-method">/metadata\_fields/:external\_id/datasource | [Updates a metadata field datasource by external ID.](admin_api#update_a_metadata_field_datasource) 
DELETE<code class="code-method">/metadata\_fields/:external\_id | [Deletes a metadata field by external ID.](admin_api#delete_a_metadata_field_by_external_id)
DELETE<code class="code-method">/metadata\_fields/:external\_id/datasource | [Deletes entries in a metadata field datasource for a specified metadata field definition.](admin_api#delete_entries_in_a_metadata_field_datasource)

---

### Get metadata fields

Returns a list of all metadata field definitions as an array of JSON objects. 

**See also**: [Metadata field structure](#metadata_field_structure)

#### Syntax

`GET  /metadata_fields`

```multi
|ruby
Cloudinary::Api.list_metadata_fields(options = {})

|php_2
$api->listMetadataFields();

|python
cloudinary.api.list_metadata_fields(**options)

|nodejs
cloudinary.v2.api.list_metadata_fields(options).then(callback);

|java
api.listMetadataFields();

|csharp
cloudinary.ListMetadataFields();

|go
resp, err := cld.Admin.ListMetadataFields(ctx)

|cli
cld admin list_metadata_fields 
```

#### Sample response

```json
{
  "metadata_fields": 
  [
    {
      "type": "date",
      "external_id": "available_date",
      "label": "Available date",
      "mandatory": false,
      "default_value": "2015-01-01",
      "validation": null,
      "default_disabled": false,
      "restrictions": {
        "readonly_ui": false
      },
      "allow_dynamic_list_values": false
    },
    {
      "type": "integer",
      "external_id": "in_stock",
      "label": "In stock",
      "mandatory": false,
      "default_value": 42,
      "validation": null,
      "default_disabled": false,
      "restrictions": {
        "readonly_ui": false
      },
      "allow_dynamic_list_values": true
    }
  ]
}
```

---

### Get a metadata field by external ID

Returns a single metadata field definition. 

**See also**: [Metadata field structure](#metadata_field_structure)

#### Syntax

`GET /metadata_fields/:external_id`

```multi
|ruby
Cloudinary::Api.metadata_field_by_field_id(external_id, options = {})

|php_2
$api->metadataFieldByFieldId($externalId);

|python
cloudinary.api.metadata_field_by_field_id(external_id, **options)

|nodejs
cloudinary.v2.api.metadata_field_by_field_id(external_id, options).then(callback);

|java
api.metadataFieldByFieldId(String externalId);

|csharp
cloudinary.GetMetadataField(string externalId);

|go
resp, err := cld.Admin.MetadataFieldByFieldID(ctx, admin.MetadataFieldByFieldIDParams{})

|cli
cld admin metadata_field_by_field_id (external_id) 
```

#### Required parameters

Parameter | Type | Description 
---|---|---
`external_id` | String | The ID of the metadata field (included in the endpoint URL when using the REST API).

#### Examples

Return the information for the metadata field with the ID of 'in_stock':

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/metadata_fields/in_stock
    
|ruby
Cloudinary::Api.metadata_field_by_field_id("in_stock")

|php_2
$api->metadataFieldByFieldId("in_stock");

|python
cloudinary.api.metadata_field_by_field_id("in_stock")

|nodejs
cloudinary.v2.api
.metadata_field_by_field_id('in_stock')
.then(result=>console.log(result));

|java
api.metadataFieldByFieldId("in_stock");

|csharp
cloudinary.GetMetadataField("in_stock");

|go
resp, err := cld.Admin.MetadataFieldByFieldID(ctx, admin.MetadataFieldByFieldIDParams{
    FieldExternalID: "in_stock"})

|cli
cld admin metadata_field_by_field_id "in_stock"
```

#### Sample response

```json
{
    "type": "integer",
    "external_id": "in_stock",
    "label": "In stock",
    "mandatory": false,
    "default_value": 100,
    "validation": null,
    "default_disabled": false,
    "restrictions": {
      "readonly_ui": false
    },
    "allow_dynamic_list_values": true
}
``` 

---

### Create a metadata field

Creates a new metadata field definition. Expects a single JSON object which defines the field, according to the structure for the required field type. 

**See also**: [Metadata field structure](#metadata_field_structure)

> **NOTE**: Cloudinary product environments can have a maximum of 100 structured metadata fields each. After reaching the maximum, you must disable one or more existing fields in order to add a new one.

#### Syntax

`POST /metadata_fields`

```multi
|ruby
Cloudinary::Api.add_metadata_field(field, options = {})
|php_2
$api->addMetadataField($field);
|python
cloudinary.api.add_metadata_field(field, **options)
|nodejs
cloudinary.v2.api.add_metadata_field(field, options).then(callback);
|java
api.addMetadataField(MetadataField field);
|csharp
cloudinary.AddMetadataField(MetadataFieldCreateParams field);
|go
resp, err := cld.Admin.AddMetadataField(ctx, metadata.Field{})
|cli
cld admin add_metadata_field $field $options
```

#### Required parameters

Parameter | Type | Description 
---|---|---
`field` | Object | The metadata field to add. For details see [Metadata field structure](#metadata_field_structure).

#### Optional parameters

Parameter | Type | Description 
---|---|---
`allow_dynamic_list_values` | Boolean | Sets whether Assets users can add list values dynamically. For more information, see [Managing structured metadata fields](media_library_for_developers#managing_structured_metadata_fields). **Default**: `false`

#### Examples

Add a new mandatory metadata `set` (multi-select) field with an external_id of 'color_id', labeled 'Colors', and with 4 available colors: red, green, blue and yellow, where red and green are the default values:

```multi
|curl
curl \
  -H "Content-Type: application/json" \
  -d '{          
    "external_id": "color_id",
    "label": "Colors",
    "type": "set" ,
    "mandatory": "true",
    "default_value": ["color1","color2"],
    "datasource": {
      "values": [
        {"external_id": "color1", "value": "red"},
        {"external_id": "color2", "value": "green"},
        {"external_id": "color3", "value": "blue"},
        {"external_id": "color4", "value": "yellow"}
      ]
    }
  }' \  
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/metadata_fields

|ruby
Cloudinary::Api.add_metadata_field({          
  :"external_id" => "color_id",
  :"label" => "Colors",
  :"type" => "set" ,
  :"mandatory" => "true",
  :"default_value" => ["color1","color2"],
  :"datasource" => {
    :"values" => [
      {:"external_id" => "color1", :"value" => "red"},
      {:"external_id" => "color2", :"value" => "green"},
      {:"external_id" => "color3", :"value" => "blue"},
      {:"external_id" => "color4", :"value" => "yellow"}
    ]
  }
})

|php_2
use Cloudinary\Api\Metadata\SetMetadataField;

$datasourceValues = [
    ["external_id" => "color1", "value" => "red"],
    ["external_id" => "color2", "value" => "green"],
    ["external_id" => "color3", "value" => "blue"],
    ["external_id" => "color4", "value" => "yellow"],
];
$setMetadataField = new SetMetadataField("color_id", $datasourceValues);
$setMetadataField->setLabel("Colors");
$setMetadataField->setMandatory(true);
$setMetadataField->setDefaultValue(["color1", "color2"]);
$api->addMetadataField($setMetadataField);

|python
cloudinary.api.add_metadata_field({          
  "external_id": "color_id",
  "label": "Colors",
  "type": "set" ,
  "mandatory": True,
  "default_value": ["color1","color2"],
  "datasource": {
    "values": [
      {"external_id": "color1", "value": "red"},
      {"external_id": "color2", "value": "green"},
      {"external_id": "color3", "value": "blue"},
      {"external_id": "color4", "value": "yellow"}
    ]
  }
})

|nodejs
cloudinary.v2.api
.add_metadata_field({          
  "external_id": "color_id",
  "label": "Colors",
  "type": "set" ,
  "mandatory": "true",
  "default_value": ["color1","color2"],
  "datasource": {
    "values": [
      {"external_id": "color1", "value": "red"},
      {"external_id": "color2", "value": "green"},
      {"external_id": "color3", "value": "blue"},
      {"external_id": "color4", "value": "yellow"}
    ]
  }
})
.then(result=>console.log(result));

|java
SetMetadataField setField = new SetMetadataField();
setField.setExternalId("color_id");
setField.setLabel("Colors");
setField.setMandatory(true);
setField.setDefaultValue(Arrays.asList("color1", "color2"));
setField.setDataSource(new MetadataDataSource(Arrays.asList(
  new Entry("color1", "red"),
  new Entry("color2", "green"),
  new Entry("color3", "blue"),
  new Entry("color4", "yellow")
)));
api.addMetadataField(setField);


|csharp
var metadataFieldCreateParams = new SetMetadataFieldCreateParams("color_id"){
  Label = "Colors",
  Mandatory = true,
  DefaultValue = new List<string>{"color1" ,"color2"},
  DataSource = new MetadataDataSourceParams(new List<EntryParams>{
    new EntryParams("color1", "red"),
    new EntryParams("color2", "green"),
    new EntryParams("color3", "blue"),
    new EntryParams("color4", "yellow")})
};
cloudinary.AddMetadataField(metadataFieldCreateParams);

|go
resp, err := cld.Admin.AddMetadataField(ctx, metadata.Field{
	Type:         metadata.SetFieldType,
	ExternalID:   "color_id",
	Label:        "Colors",
	Mandatory:    true,
	DefaultValue: []string{"color1", "color2"},
	DataSource: metadata.DataSource{
		Values: []metadata.DataSourceValue{
			{
				ExternalID: "color1",
				Value:      "red",
				State:      "active",
			},
			{
				ExternalID: "color2",
				Value:      "green",
				State:      "active",
			},
			{
				ExternalID: "color3",
				Value:      "blue",
				State:      "active",
			},
			{
				ExternalID: "color4",
				Value:      "yellow",
				State:      "active",
			},
		},
	}})

|cli
cld admin add_metadata_field `{"external_id": "color_id", "label": "Colors", "type": "set", "mandatory": "true", "default_value": ["color1","color2"], "datasource": {"values": [{"external_id": "color1", "value": "red"}, {"external_id": "color2", "value": "green"}, {"external_id": "color3", "value": "blue"}, {"external_id": "color4", "value": "yellow"}]}}`
```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response

```json
{
    "type": "set", 
    "external_id": "color_id", 
    "label": "Colors", 
    "mandatory": true, 
    "default_value": ["color1", "color2"], 
    "validation": null,
    "default_disabled": false,
    "restrictions": {
      "readonly_ui": false
    }, 
    "datasource": {
      "values": [
      {
        "external_id": "color1", 
        "value": "red", 
        "state": "active"
      }, 
      {
        "external_id": "color2", 
        "value": "green", 
        "state": "active"
      }, 
      {
        "external_id": "color3", 
        "value": "blue", 
        "state": "active"
      }, 
      {
        "external_id": "color4", 
        "value": "yellow", 
        "state": "active"
      }]
    },
    "allow_dynamic_list_values": false
}
```

---

### Search metadata field datasource

Searches for datasource values across all metadata fields. This enables you to search and retrieve datasource entries along with their associated field IDs.

**See also**: [Metadata field structure](#metadata_field_structure)

#### Syntax

`POST /metadata_fields/datasource/search`

#### Required parameters

Parameter | Type | Description 
---|---|---
`term` | String | The term to search for. Can be any part of the value.

#### Optional parameters

Parameter | Type | Description 
---|---|---
`max_results` | Integer | The maximum number of datasource entries to return. **Default**: 100.

#### Example

Retrieve all structured metadata fields that have a datasource value containing "red".

```multi
|curl
curl --request POST \
  --url https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/metadata_fields/datasource/search \
  --header 'Content-Type: application/json' \
  --data '{
    "term": "red",
    "max_results": 100
  }'
```

#### Sample response

```json
[
  {
    "field_id": "color_id",
    "id": "color1",
    "value": "red"
  },
  {
    "field_id": "product_status",
    "id": "status_retired",
    "value": "retired"
  }
]
```

---

### Restore entries in a metadata field datasource

Restores (unblocks) any previously [deleted datasource entries](#delete_entries_in_a_metadata_field_datasource) for a specified metadata field definition. Sets the state of the entries to active. 

**See also**: [Metadata field structure](#metadata_field_structure)

#### Syntax

`POST /metadata_fields/:external_id/datasource_restore`

```multi
|ruby
Cloudinary::Api.restore_metadata_field_datasource(external_id, external_ids, options = {})

|php_2
$api->restoreMetadataFieldDatasource($externalId, $externalIds);

|python
cloudinary.api.restore_metadata_field_datasource(external_id, external_ids, **options)

|nodejs
cloudinary.v2.api.restore_metadata_field_datasource(external_id, external_ids, options).then(callback);

|java
api.restoreDatasourceEntries(String externalId, List<String> externalIds);

|csharp
cloudinary.RestoreMetadataDataSourceEntries(string externalId, List<string> externalIds)

|go
resp, err := cld.Admin.RestoreDatasourceEntries(ctx, admin.RestoreDatasourceEntriesParams{})

|cli
cld admin restore_metadata_field_datasource (external_id, external_ids)
```

#### Required parameters

Parameter | Type | Description 
---|---|---
`external_id` | String | The ID of the metadata field (included in the endpoint URL when using the REST API).
`external_ids` | String[] | An array of IDs of datasource entries to restore (unblock).

#### Examples

Restore (unblock) the datasource entry with external\_id 'color1' from the metadata field with external\_id 'color_id':

```multi
|curl
curl --request POST \
  --url https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/metadata_fields/color_id/datasource_restore \
  --header 'Content-Type: application/json' \
  --data '{
    "external_ids": ["color1"]
  }'
  
|ruby
Cloudinary::Api.restore_metadata_field_datasource("color_id", ["color1"])

|php_2
$api->restoreMetadataFieldDatasource("color_id", ["color1"]);

|python
cloudinary.api.restore_metadata_field_datasource("color_id", ["color1"])

|nodejs
cloudinary.v2.api
.restore_metadata_field_datasource('color_id', ["color1"])
.then(result=>console.log(result));

|java
api.restoreDatasourceEntries("color_id", Arrays.asList("color1"));

|csharp
cloudinary.RestoreMetadataDataSourceEntries("color_id", new List<string>{"color1"});

|go
resp, err := cld.Admin.RestoreDatasourceEntries(ctx, admin.RestoreDatasourceEntriesParams{
				FieldExternalID: "color_id", 
				EntriesExternalIDs: []string{"color_1"}})

|cli
cld admin restore_metadata_field_datasource color_id color1
```

#### Sample response

```json
{ 
    "values": [{
      "external_id": "color1", 
      "value": "red"}, 
    { 
      "external_id": "color2",  
      "value": "green"}, 
    {
      "external_id": "color3", 
      "value": "blue"}, 
    {
      "external_id": "color4", 
      "value": "yellow"}]
}
```

---
### Order a metadata field datasource

Updates the ordering of a [datasource](#datasource_values) of a supported field type (currently only enum and set). 

#### Syntax

`PUT /metadata_fields/:external_id/datasource/order`

```multi
|ruby
Cloudinary::Api.reorder_metadata_field_datasource(external_id, order_by, direction, options = {})

|php_2
$cloudinary->adminApi()->reorderMetadataFieldDatasource($externalId, $orderBy, $direction = null);

|python
cloudinary.api.reorder_metadata_field_datasource(external_id, order_by, direction=None, **options)

|nodejs
cloudinary.v2.api.order_metadata_field_datasource(external_id, order_by, direction, options).then(callback);

|java
api.reorderMetadataFields(String externalId, String orderBy, String direction, Map options);

|csharp
cloudinary.ReorderMetadataFieldDatasource(string externalId, string orderBy, string direction = null)

|go
resp, err := cld.Admin.ReorderMetadataFieldDatasource(ctx, admin.ReorderMetadataFieldDatasourceParams{})

|cli
cld admin reorder_metadata_field_datasource (external_id, order_by, direction)
```

#### Required parameters

Parameter | Type | Description 
---|---|---
`external_id` | String | The ID of the metadata field (included in the endpoint URL when using the REST API).
`order_by` | String | The criteria for the sort. Currently supports only `value`.
`direction` | String | Control the ordering direction. **Possible values**: `desc` or `asc`. 

#### Examples

Reorder the datasource values in ascending order for the metadata field with the ID of 'color_id':

```multi
|curl
curl \
  -H "Content-Type: application/json" \
  -d '{ "order_by": "value", "direction": "asc" }' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/metadata_fields/color_id/datasource/order
 
|ruby
Cloudinary::Api.reorder_metadata_field_datasource("color_id", "value", "asc")

|php_2
$cloudinary->adminApi()->reorderMetadataFieldDatasource("color_id", "value", "asc");

|python
cloudinary.api.reorder_metadata_field_datasource("color_id", "value", "asc")

|nodejs
cloudinary.v2
.api.order_metadata_field_datasource("color_id", "value", "asc")
.then(result=>console.log(result));

|java
api.reorderMetadataFields("color_id", "value", "asc", Collections.EMPTY_MAP);

|csharp
cloudinary.ReorderMetadataFieldDatasource("color_id", "value", "asc");

|go
resp, err := cld.Admin.ReorderMetadataFieldDatasource(ctx, admin.ReorderMetadataFieldDatasourceParams{
		FieldExternalID: "color_id",
		FieldOrderBy: "value".
    FieldDirection: "asc"})

|cli
cld admin reorder_metadata_field_datasource "color_id" "value" "asc"
```

#### Sample response

```json
{ 
    "values": [{
      "external_id": "color1", 
      "value": "black"}, 
    { 
      "external_id": "color2",  
      "value": "blue"}, 
    {
      "external_id": "color3", 
      "value": "orange"}, 
    {
      "external_id": "color4", 
      "value": "yellow"}]
}
```

---

### Update a metadata field by external ID

Updates a metadata field definition (partially, no need to pass the entire object) passed as JSON data. 

**See also**: [Metadata field structure](#metadata_field_structure)

#### Syntax

`PUT /metadata_fields/:external_id`

```multi
|ruby
Cloudinary::Api.update_metadata_field(external_id, field, options = {})

|php_2
$api->updateMetadataField($externalId, $field);

|python
cloudinary.api.update_metadata_field(external_id, field, **options)

|nodejs
cloudinary.v2.api.update_metadata_field(external_id, field, options).then(callback);

|java
api.updateMetadataField(String externalId, MetadataField field);

|csharp
cloudinary.UpdateMetadataField(string externalId, MetadataFieldUpdateParams field)

|go
resp, err := cld.Admin.UpdateMetadataField(ctx, admin.UpdateMetadataFieldParams{})

|cli
cld admin update_metadata_field (external_id, field)
```

#### Required parameters

Parameter | Type | Description 
---|---|---
`external_id` | String | The ID of the metadata field (included in the endpoint URL when using the REST API).
`field` | Object | The metadata field to update. For details see [Metadata field structure](#metadata_field_structure).

#### Optional parameters

Parameter | Type | Description 
---|---|---
`allow_dynamic_list_values` | Boolean | Sets whether Assets users can add list values dynamically. For more information, see [Managing structured metadata fields](media_library_for_developers#managing_structured_metadata_fields). **Default**: `false`

#### Examples

Update the metadata field with the ID of 'in_stock':

```multi
|curl
curl \
  -H "Content-Type: application/json" \
  -d '{
    "label": "Now in stock",
    "mandatory": true
  }' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/metadata_fields/in_stock
 
|ruby
Cloudinary::Api.update_metadata_field("in_stock", {
  :"label" => "Now in stock",
  :"mandatory" => true  })

|php_2
use Cloudinary\Api\Metadata\StringMetadataField;

$stringMetadataField = new StringMetadataField("in_stock");
$stringMetadataField->setLabel("Now in stock");
$stringMetadataField->setMandatory(true);
$api->updateMetadataField("in_stock", $stringMetadataField);

|python
cloudinary.api.update_metadata_field("in_stock", {
  "label": "Now in stock",
  "mandatory": True })

|nodejs
cloudinary.v2.api
.update_metadata_field('in_stock', {
  "label": "Now in stock",
  "mandatory": true  })
.then(result=>console.log(result));

|java
SetMetadataField setField = new SetMetadataField();
setField.setLabel("Now in stock");
setField.setMandatory(true);
api.updateMetadataField("in_stock", setField);

|csharp
var MetadataFieldUpdateParams = new StringMetadataFieldUpdateParams(){
  Label = "Now in stock",
  Mandatory = true  };
cloudinary.UpdateMetadataField("in_stock", MetadataFieldUpdateParams);

|go
resp, err := cld.Admin.UpdateMetadataField(ctx, admin.UpdateMetadataFieldParams{
		FieldExternalID: "in_stock",
		Field: metadata.Field{
			Label:     "Now in stock",
			Mandatory:  true}})

|cli
cld admin update_metadata_field 'in_stock' '{"label": "Now in stock", "mandatory": true}'
```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response

```json
{
  "type": "integer",
  "external_id": "in_stock",
  "label": "Now in stock",
  "mandatory": true,
  "default_value": 100,
  "validation": null,
  "default_disabled": false,
  "restrictions": {
    "readonly_ui": false
  },
  "allow_dynamic_list_values": false
}
```

---
### Update a metadata field datasource

Updates the [datasource](#datasource_values) of a supported field type (currently only enum and set), passed as JSON data. The update is partial: datasource entries with an existing external\_id will be updated and entries with new external\_id's (or without external\_id's) will be appended. 

**See also**: [Metadata field structure](#metadata_field_structure)

#### Syntax

`PUT /metadata_fields/:external_id/datasource`

```multi
|ruby
Cloudinary::Api.update_metadata_field_datasource(external_id, entries, options = {})

|php_2
$api->updateMetadataFieldDatasource($externalId, $entries);

|python
cloudinary.api.update_metadata_field_datasource(external_id, entries, **options)

|nodejs
cloudinary.v2.api.update_metadata_field_datasource(external_id, entries, options).then(callback);

|java
api.updateMetadataFieldDatasource(String externalId, List<MetadataDataSource.Entry> entries);

|csharp
cloudinary.UpdateMetadataDataSourceEntries(string externalId, MetadataDataSourceParams entries)

|go
resp, err := cld.Admin.UpdateMetadataFieldDataSource(ctx, admin.UpdateMetadataFieldDataSourceParams{})

|cli
cld admin update_metadata_field_datasource (external_id, entries)
```

#### Required parameters

Parameter | Type | Description 
---|---|---
`external_id` | String | The ID of the metadata field (included in the endpoint URL when using the REST API).
`entries` | Object | The datasource entries to update. For details see [Datasource values](#datasource_values).

#### Examples

Update the datasource for the metadata field with the ID of ''color_id':

```multi
|curl
curl \
  -H "Content-Type: application/json" \
  -d '{  
    "values":[{  
      "external_id":"color1",
      "value":"orange"
    },
    {  
      "external_id":"color2",
      "value":"black"
    }]
  }' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/metadata_fields/color_id/datasource
 
|ruby
Cloudinary::Api.update_metadata_field_datasource("color_id", {  
  :"values" => [{  
    :"external_id" => "color1",
    :"value" => "orange"
  },
  {  
    :"external_id" => "color2",
    :"value" => "black"
  }]
})

|php_2
$entries = [
    ["external_id" => "color1", "value" => "orange"],
    ["external_id" => "color2", "value" => "black"]
];
$api->updateMetadataFieldDatasource("color_id", $entries);

|python
cloudinary.api.update_metadata_field_datasource("color_id", [  
  {  
    "external_id":"color1",
    "value":"orange"
  },
  {  
    "external_id":"color2",
    "value":"black"
  }]
)

|nodejs
cloudinary.v2
.api.update_metadata_field_datasource('color_id', {  
  "values":[{  
    "external_id":"color1",
    "value":"orange"
  },
  {  
    "external_id":"color2",
    "value":"black"
  }]
})
.then(result=>console.log(result));

|java
api.updateMetadataFieldDatasource("color_id", 
  new MetadataDataSource(Arrays.asList(
    new Entry("color1", "orange"),
    new Entry("color2", "black")))
);

|csharp
var metadataDataSourceParams = new MetadataDataSourceParams(){  
  Values = [{  
    ExternalId = "color1",
    Value = "orange"
  },
  {  
    ExternalId = "color2",
    Value = "black"
  }]
};
cloudinary.UpdateMetadataDataSourceEntries("color_id", metadataDataSourceParams);

|go
resp, err := cld.Admin.UpdateMetadataFieldDataSource(ctx, admin.UpdateMetadataFieldDataSourceParams{
		FieldExternalID: "color_id",
		DataSource: metadata.DataSource{
			Values: []metadata.DataSourceValue{
				{
					ExternalID: "color1",
					Value:      "orange",
					State:      "active",
				},
				{
					ExternalID: "color2",
					Value:      "black",
					State:      "active",
				}}}})

|cli
cld admin update_metadata_field_datasource 'color_id' '[{"external_id":"color1", "value":"orange"}, {"external_id":"color2", "value":"black"}]'
```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response

```json
{ 
    "values": [{
      "external_id": "color1", 
      "value": "orange"}, 
    { 
      "external_id": "color2",  
      "value": "black"}, 
    {
      "external_id": "color3", 
      "value": "blue"}, 
    {
      "external_id": "color4", 
      "value": "yellow"}]
}
```

---
### Delete a metadata field by external ID

Deletes a metadata field definition. The field should no longer be considered a valid candidate for all other endpoints (it won't show up in the list of fields, etc). 

> **NOTE**: `external_id`s can be reused after fields are deleted, but if the fields had many assignments, the process can take a few minutes and the `external_id` will be reserved until the asynchronous deletion is complete.

**See also**: [Metadata field structure](#metadata_field_structure)

#### Syntax

`DELETE /metadata_fields/:external_id`

```multi
|ruby
Cloudinary::Api.delete_metadata_field(external_id, options = {})

|php_2
$api->deleteMetadataField($externalId);

|python
cloudinary.api.delete_metadata_field(external_id, **options)

|nodejs
cloudinary.v2.api.delete_metadata_field(external_id, options).then(callback);

|java
api.deleteMetadataField(String externalId);

|csharp
cloudinary.DeleteMetadataField(string externalId)

|go
resp, err := cld.Admin.DeleteMetadataField(ctx, admin.DeleteMetadataFieldParams{})

|cli
cld admin delete_metadata_field (external_id) 
```

#### Required parameters

Parameter | Type | Description 
---|---|---
`external_id` | String | The ID of the metadata field (included in the endpoint URL when using the REST API).

#### Examples

Delete the metadata field with the ID of 'in_stock':

```multi
|curl
curl 
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/metadata_fields/in_stock
 
|ruby
Cloudinary::Api.delete_metadata_field("in_stock")

|php_2
$api->deleteMetadataField("in_stock");

|python
cloudinary.api.delete_metadata_field("in_stock")

|nodejs
cloudinary.v2.api
.delete_metadata_field('in_stock')
.then(result=>console.log(result));

|java
api.deleteMetadataField("in_stock");

|csharp
cloudinary.DeleteMetadataField("in_stock");

|go
resp, err := cld.Admin.DeleteMetadataField(ctx, admin.DeleteMetadataFieldParams{
		FieldExternalID: "in_stock"})

|cli
cld admin delete_metadata_field "in_stock" 
```

#### Sample response

```json
{ 
   "message": "ok"
}
```

---

### Delete entries in a metadata field datasource

Deletes (blocks) the [datasource](#datasource_values) entries for a specified metadata field definition. Sets the state of the entries to `inactive`. This is a soft delete, so the entries still exist under the hood but are marked as having an inactive `state`. The entries can be activated again with the [restore datasource entries](#restore_entries_in_a_metadata_field_datasource) method. 

> **NOTE**: As inactive entries aren't deleted, they still show up in responses with their `state` property set to `inactive`.

**See also**: [Metadata field structure](#metadata_field_structure)

#### Syntax

`DELETE /metadata_fields/:external_id/datasource`

```multi
|ruby
Cloudinary::Api.delete_datasource_entries(external_id, external_ids, options = {})

|php_2
$api->deleteDatasourceEntries($externalId, $externalIds);

|python
cloudinary.api.delete_datasource_entries(external_id, external_ids, **options)

|nodejs
cloudinary.v2.api.delete_datasource_entries(external_id, external_ids, options).then(callback);

|java
api.deleteDatasourceEntries(String externalId, List<String> externalIds);

|csharp
cloudinary.DeleteMetadataDataSourceEntries(string externalId, List<string> externalIds)

|go
resp, err := cld.Admin.DeleteDataSourceEntries(ctx, admin.DeleteDataSourceEntriesParams{})

|cli
cld admin delete_datasource_entries (external_id, external_ids)
```

#### Required parameters

Parameter | Type | Description 
---|---|---
`external_id` | String | The ID of the metadata field (included in the endpoint URL when using the REST API).
`external_ids` | String[] | An array of IDs of datasource entries to delete.

#### Examples

Delete (block) the datasource entry with external\_id 'color4' from the metadata field with external\_id 'color_id':

```multi
|curl
curl \
  -d "external_ids[]=color1" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/metadata_fields/color_id/datasource
 
|ruby
Cloudinary::Api.delete_datasource_entries("color_id", ["color4"])

|php_2
$api->deleteDatasourceEntries("color_id", ["color4"]);

|python
cloudinary.api.delete_datasource_entries("color_id", ["color4"])

|nodejs
cloudinary.v2.api
.delete_datasource_entries('color_id', ["color4"])
.then(result=>console.log(result));

|java
api.deleteDatasourceEntries("color_id", Arrays.asList("color4"));

|csharp
cloudinary.DeleteMetadataDataSourceEntries("color_id", new List<string>{"color4"});

|go
resp, err := cld.Admin.DeleteDataSourceEntries(ctx, admin.DeleteDataSourceEntriesParams{
		FieldExternalID: "color_id", 
		EntriesExternalIDs: []string{"color4"}})

|cli
cld admin delete_datasource_entries color_id color4
```

#### Sample response

```json
{
    "values": [{
      "external_id": "color1", 
      "value": "red"}, 
    {
      "external_id": "color2", 
      "value": "green"}, 
    {
      "external_id": "color3", 
      "value": "blue"}]
}
```

---

### Metadata field structure

Metadata fields have the following structure:

```json
{
  "external_id": <string>,
  "type": <field_type_enum>,
  "label": <string>,
  "mandatory": <boolean>,
  "default_disabled": <boolean>,
  "restrictions": <restrictions_object>,
  "default_value": <field_type_value>,
  "validation": <validation_object>,
  "datasource": <datasource_object>  //enum and set types
}
```

Parameter | Required | Description
---|---|---
`external_id` | No | A unique immutable identification string for the metadata field. **Default**: auto-generated by Cloudinary (although it's recommended to specify a descriptive name). Max character length: 255.
`type` | Yes | The type of value that can be assigned to the metadata field, possible types are limited to:* `string` - a single string value* `integer` - a single integer value* `date` - a custom date in the following format: {yyyy-mm-dd}* `enum` - a single value referenced by an `external_id` from a given list, predefined with the `datasource` parameter* `set` - multiple values referenced by `external_id`s from a given list, predefined with the `datasource` parameter
`label` | Yes | The label of the metadata field for display purposes.
`mandatory` | No |  Whether a value must be given for this field, either when an asset is first uploaded, or when it's updated. **Default**: `false`
| `default_disabled` | No       | Whether the metadata field is disabled by default for new assets. If `true`, the field must be activated after upload, either manually or via a conditional metadata rule. **Default**: `false`. 
`restrictions` | No | Any restrictions to apply. Currently can set the `readonly_ui` boolean parameter to mark this metadata field as [read only in the UI](dam_admin_structured_metadata#read_only) (only relevant if `mandatory` is false). **Default**: `{"readonly_ui": false}` 
`default_value` | Yes (if `mandatory` is true) | The default value for the field (a set can have multiple default values defined by an array). **Default**: `null`
`validation` | No | Any validation rules to apply when values are entered (or updated) for this field. See [Validating data](#validating_data) for more details. **Default**: `null` 
`datasource` | Yes (for the enum and set `type`) | The predefined list of values, referenced by `external_id`s, available for this field. See [Datasource values](#datasource_values) for more details.

### Validating data 

The `validation` parameter defines a validation object with the logic to apply when a value is entered for the field. The boolean validations also allow for combinations of more than one rule. The following validations are supported:

* [greater_than](#greater_than_validation) 
* [less_than](#less_than_validation) 
* [strlen](#strlen_validation) 
* [strregex](#strregex_validation)
* [and](#and_validation)

#### greater_than validation

Relevant for `integer` and `date` types:

```json
{
	"type": "greater_than",
	"value": <value_by_type>,
	"equals": <boolean>
}
```

Property | Type | Description
---|---|---
`value` | String | The value for validation.
`equals` | Boolean | Whether to check if greater than or equals. **Default**: `false`

For example:

```json
"validation":{ 
	"type": "greater_than",
	"value": "2018-10-15",
	"equals": true
}
```

#### less_than validation 

Relevant for `integer` and `date` types:

```json
{
	"type": "less_than",
	"value": <value_by_type>,
	"equals": <boolean>
}
```

Property | Type | Description
---|---|---
`value` | String | The value for validation.
`equals` | Boolean | Whether to check if less than or equals. **Default**: `false`

For example:

```json
"validation":{ 
	"type": "less_than",
	"value": 50,
	"equals": true
}
```

#### strlen validation

All string values must be UTF-8 encoded. The table below specifies the valid minimum and maximum lengths for string types.

```json
{
	"type": "strlen",
	"min": <positive integer>,
	"max": <positive integer>
}
```

Property | Type | Description
---|---|---
`min` | Integer | The minimum string length. **Default**: `0`
`max` | Integer | The maximum string length. **Default**: `4,000,000` (≈4 MB)

> **NOTE**: Either min or max must be given, supplying both is optional.

For example:

```json
"validation":{ 
	"type": "strlen",
	"min": 5,
	"max": 20
}
```

#### strregex validation

Restricts the values allowed in a string field to a specific pattern using regular expression (regex) validation, ensuring the input matches the required format. 

> **TIP**: You can set regex validation in the [Media Library](media_library_for_developers#managing_structured_metadata_fields) for structured metadata fields of type text, and you can view the validations you set programmatically.

**Basic example:**

```json        
"validation":{
  "type": "strregex",
  "regex": "[a-zA-Z]{3}"
}
```

The `regex` value can be any legal regular expression that adheres to the [Perl Compatible Regular Expressions (PCRE)](https://www.pcre.org/) standard.

**Common use cases with examples:**

* **Email validation** (pragmatic pattern):
  ```json
  "validation": {
    "type": "strregex",
    "regex": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  }
  ```

* **UUID validation** (v1-v5):
  ```json
  "validation": {
    "type": "strregex",
    "regex": "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
  }
  ```

* **URL slug validation** (lowercase with hyphens):
  ```json
  "validation": {
    "type": "strregex",
    "regex": "^[a-z0-9]+(?:-[a-z0-9]+)*$"
  }
  ```

* **SKU/Product code** (3-32 alphanumeric characters with safe separators):
  ```json
  "validation": {
    "type": "strregex",
    "regex": "^[A-Z0-9][A-Z0-9_-]{2,31}$"
  }
  ```

* **HTTPS URL**:
  ```json
  "validation": {
    "type": "strregex",
    "regex": "^https:\\/\\/[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)+(?::\\d{2,5})?(?:\\/[^\\s]*)?$"
  }
  ```

> **TIP**: Regular expression validation is particularly valuable for fields used in integrations with external systems (PIM, CMS, etc.) where consistent data formatting is critical for reliable data exchange.

#### and validation 

Relevant for all field types. Allows you to include more than one validation rule to be evaluated:

```json
{
	"type": "and",
	"rules": [ <validation_object>, <validation_object>, … ]
}
```

Property | Type | Description
---|---|---
`validation_object` | Object | One of the other validations above: `greater_than`, `less_than`, `strlen` or `strregex`

For example:

```json
"validation":{
	"type":  "and"
	"rules": [{ 
		"type": "greater_than",
		"value": 10,
		"equals": true
	},
	{ 
		"type": "less_than",
		"value": 50,
		"equals": true
	}]
}
```

### Datasource values

The `datasource` parameter is relevant for fields where the selected values must come from a predefined list of values (`enum` or `set` type fields). The parameter contains the `values` property, which defines the values for the `enum` or `set` list. Up to 3000 values can be defined for a list.

```json
{
	"values": [ <datasource_entry>, <datasource_entry>, … ]
}
```

Each `datasource_entry` defines a single possible value for the field:

```json
{
	"external_id": <string>,
	"value": <string>,
	"state": "active" | "inactive"
}
```

Property | Type | Description
---|---|---
`external_id` | String | (optional)  A unique immutable identification string for the datasource entry, (required if the value is referenced by the default_value field). Default: auto-generated by Cloudinary
`value` | String |  (mandatory) The value for this datasource.
`state` | String | (read only) Only given as part of a response - ignored on requests. it's immutable unless changed via DELETE of a datasource entry.

For example:

```json
"datasource": {
    "values": [{
    	"external_id": "color1", 
		"value": "red"
	},
    {	
    	"external_id": "color2", 
    	"value": "green"
    },
    {
    	"external_id": "color3", 
    	"value": "blue"
    },
    {
    	"external_id": "color4", 
    	"value": "yellow"
    }]
}
```

## metadata_rules

Run in Postman
Learn more about running Postman collections

Enables you to set up dependencies and hierarchical relationships between structured metadata fields and field options.

Method | Description
---|---
GET<code class="code-method">/metadata\_rules | [Returns an index of all metadata rules.](admin_api#get_metadata_rules)
POST<code class="code-method">/metadata\_rules | [Creates a new metadata rule definition.](admin_api#create_a_metadata_rule)
PUT<code class="code-method">/metadata\_rules/:external\_id | [Updates an existing metadata rule definition.](admin_api#update_a_metadata_rule_by_id)  
DELETE<code class="code-method">/metadata\_rules/:external\_id | [Deletes a metadata rule by external ID.](admin_api#delete_a_metadata_rule_by_id)

---

### Get metadata rules

Returns an index of all metadata rules (active and inactive) as an array of JSON objects. The rules are sorted by the dependent metadata field id, and then by their internal order (currently the order of insertion).

#### Syntax

`GET  /metadata_rules`

```multi
|ruby
Cloudinary::Api.list_metadata_rules(options = {})

|nodejs
cloudinary.v2.api.list_metadata_rules(options).then(callback);
```

#### Example

```multi
|ruby
Cloudinary::Api.list_metadata_rules()

|nodejs
cloudinary.v2.api.list_metadata_rules().then(callback);

|curl 
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/metadata_rules
```

#### Sample response

```json
{
  "metadata_rules": [
    {
      "metadata_field_id": "team",
      "condition": {
        "metadata_field_id": "category",
        "equals": "employee"
      },
      "result": {
        "enable": true,
        "activate_values": "all"
      },
      "condition_signature": "99d3e8bb-241b-31f2-b364-5f73aa1843b1",
      "state": "active",
      "name": null,
      "external_id": "fcc0237121bbd0fb3393c0b41545fa1e51154feb3cecadc16cf2a33c5e0a1180"
    },
    {
      "metadata_field_id": "role",
      "condition": {
        "metadata_field_id": "team",
        "equals": "rnd"
      },
      "result": {
        "enable": true,
        "activate_values": {
          "external_ids": [
            "backend",
            "frontend",
            "qa",
            "devops"
          ],
          "exclusive": true
        }
      },
      "condition_signature": "a434ae95-c45c-38d5-9c1f-82ecf2f42317",
      "state": "active",
      "name": null,
      "external_id": "94b036a9eb4361a71d3c875212f60e4ec60b867ef3295a0cc0fa908c19ee6bbe"
    },
    {
      "metadata_field_id": "name",
      "condition": {
        "metadata_field_id": "role",
        "equals": "backend"
      },
      "result": {
        "enable": true,
        "activate_values": {
          "external_ids": [
            "ms",
            "er",
            "ik",
            "sm",
            "rm"
          ],
          "exclusive": true
        }
      },
      "condition_signature": "535381c0-00f6-399f-b673-2e08369b12f9",
      "state": "active",
      "name": null,
      "external_id": "e80803fe47365b19b168476c31eb7623233904cfe78722bb8698512bc3b94263"
    },
    {
      "metadata_field_id": "site",
      "condition": {
        "or": [
          {
            "metadata_field_id": "name",
            "equals": "ms"
          },
          {
            "metadata_field_id": "name",
            "equals": "rb"
          },
          {
            "metadata_field_id": "name",
            "equals": "rba"
          },
          {
            "metadata_field_id": "name",
            "equals": "mg"
          },
          {
            "metadata_field_id": "name",
            "equals": "dk"
          }
        ]
      },
      "result": {
        "enable": true,
        "activate_values": {
          "external_ids": [
            "usa"
          ],
          "exclusive": true
        },
        "apply_default_value": "usa"
      },
      "condition_signature": "1eaa8da5-9b2e-3974-9928-f67e4c4e2960",
      "state": "active",
      "name": null,
      "external_id": "b4c4f173aa3a4b9716837ca3b1db30a91d19e99cc9b76bf9513360868dc26227"
    }
  ]
}
```

---

### Create a metadata rule

Creates a new metadata rule definition. Expects a JSON object which defines the rule.

#### Syntax

`POST  /metadata_rules`

```multi
|ruby
Cloudinary::Api.add_metadata_rule(rule, options = {})

|nodejs
cloudinary.v2.api.add_metadata_rule(rule, options).then(callback);
```

#### Required parameters

Parameter | Type | Description 
---|---|---
rule | Object | The `rule` parameter is an object that includes the following fields: `metadata_field_id` (String) The external_id of the metadata field that this rule applies to.`condition` (Object) The condition to evaluate. For details see [Condition structure](#condition_structure).`result` (Object) The result to apply in the case that the condition is met. For details see [Result structure](#result_structure).`name` (String)  The name of the metadata rule.

#### Example

When the `category` metadata field value is equal to 'employee', enable the `team` metadata field and activate all the available values:

```multi
|ruby
Cloudinary::Api.add_metadata_rule({   
  "metadata_field_id" => "team",
  "condition" => {"metadata_field_id" => "category", "equals" => "employee"},
  "result" => { "enable" => true, "activate_values" => "all" },
  "name" => "category-employee"       
})

|nodejs
cloudinary.v2.api
.add_metadata_rule({
  "metadata_field_id": "team",
  "condition": {"metadata_field_id": "category", "equals": "employee"},
  "result": { "enable": true, "activate_values": "all" },
  "name": "category-employee" 
})
.then(result=>console.log(result));

curl \
  -H "Content-Type: application/json" \
  -d '{"condition": {"metadata_field_id": "category", "equals": "employee"}, "result": { "enable": true, "activate_values": "all" }, "metadata_field_id": "team", "name": "category-employee"}' \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/metadata_rules
```

#### Sample response 

```json
{
  "metadata_field_id": "team",
  "condition": {
    "metadata_field_id": "category",
    "equals": "employee"
  },
  "result": {
    "enable": true,
    "activate_values": "all"
  },
  "condition_signature": "fcad1886-394d-320d-babe-51f7be15d78d",
  "state": "active",
  "name": "category-employee",
  "external_id": "eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14"
}
```

---

### Update a metadata rule by ID

Updates an existing metadata rule definition. Expects a JSON object which defines the updated rule.

#### Syntax

`PUT  /metadata_rules/:external_id`

```multi
|ruby
Cloudinary::Api.update_metadata_rule(external_id, rule, options = {})

|nodejs
cloudinary.v2.api.update_metadata_rule(external_id, rule, options).then(callback);
```

#### Required parameters

Parameter | Type | Description 
---|---|---
external_id | String | The ID of the metadata rule (included in the endpoint URL when using the REST API).
rule | Object | The `rule` parameter is an object that includes the following fields: `metadata_field_id` (String) The external_id of the metadata field that this rule applies to.`condition` (Object) The condition to evaluate. For details see [Condition structure](#condition_structure).`result` (Object) The result to apply in the case that the condition is met. For details see [Result structure](#result_structure).`name` (String)  The name of the metadata rule.`state` (String)  The current status of the rule, useful for inactivating a rule without deleting it. **Possible values:** `active` or `inactive`

#### Example

Update the rule with id "eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14" as follows: when the `category` metadata field value is equal to 'employee', enable the `team` metadata field and activate all the available values:

```multi
|ruby
Cloudinary::Api.update_metadata_rule("eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14", {
  "metadata_field_id" => "team",
  "condition" => {"metadata_field_id" => "category", "equals" => "employee"},
  "result" => {"enable" => true, "activate_values" => "all"},
  "name" => "category-employee"            
})

|nodejs
cloudinary.v2.api.update_metadata_rule("eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14", {
  "metadata_field_id": "team",
  "condition": {"metadata_field_id": "category", "equals": "employee"},
  "result": {"enable": true, "activate_values": "all"},
  "name": "category-employee" 
})
.then(result=>console.log(result));

|curl
curl \
  -H "Content-Type: application/json" \
    -d '{"condition": {"metadata_field_id": "category", "equals": "employee"}, "result": {"enable": true, "activate_values": "all"}, "metadata_field_id": "team"}' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/metadata_rules/eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14
```

#### Sample response

```json
{
  "metadata_field_id": "team",
  "condition": {
    "metadata_field_id": "category",
    "equals": "employee"
  },
  "result": {
    "enable": true,
    "activate_values": "all"
  },
  "condition_signature": "fcad1886-394d-320d-babe-51f7be15d78d",
  "state": "inactive",
  "name": "category-employee",
  "external_id": "eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14"
} 
```

---

### Delete a metadata rule by ID

Deletes a metadata rule definition. The rule should no longer be considered a valid candidate for all other endpoints (it won't show up in the list of rules, etc). 

#### Syntax

`DELETE  /metadata_rules/:external_id`

```multi
|ruby
Cloudinary::Api.delete_metadata_rule(external_id, options = {})

|nodejs
cloudinary.v2.api.delete_metadata_rule(external_id, options).then(callback);
```

#### Required parameters

Parameter | Type | Description 
---|---|---
external_id | String | The ID of the metadata rule (included in the endpoint URL when using the REST API).

#### Example

Delete the metadata rule with an external_id of 'eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14':

```multi
|ruby
Cloudinary::Api.delete_metadata_rule("eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14")

|nodejs
cloudinary.v2.api.delete_metadata_rule("eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14")
.then(result=>console.log(result));

|curl
curl \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/metadata_rules/eae809b91168cf3877743713a9dd4b9428bb6f9c37385f6a4897f227b4b86d14
```

#### Sample response

```json
{"success":true}
```

---

### Metadata rule structure

Each metadata rule connects a specified metadata field with a condition to evaluate on a metadata payload (based on other fields' values), and then with a result to apply to the specified metadata field in the case that the condition is met. 

Metadata rule = Metadata field + [condition](#condition_structure) + [result](#result_structure)
 
---

#### Condition structure

The condition that must be met in order to activate the [result](#result_structure). Each of the conditions must include the `metadata_field_id` (external_id of a metadata field) to evaluate, and the specific criteria to evaluate.

##### Syntax

```json
{
  metadata_field_id: <string>,
  populated: <boolean>,
  includes: [<string>, <string>, … ],  
  equals: <string> or array of <strings> // array is for SET metadata fields only
}
```

##### Parameters

Property | Type | Description
---|---|---
metadata_field_id | String | Required. The external_id of the metadata field to evaluate.
populated | Boolean | Whether the metadata field is currently populated.
includes | array of Strings | For multi-select (set) fields - an array of datasource external ids specifying the current values of the metadata field.
equals | String | The current value of the metadata field.

You can set multiple conditions by defining them as `and` conditions that must all be met for the result to be applied, or as `or` conditions where it's enough that one of the conditions is met. 

```json
{
  and: [<condition>, <condition>, … ]
    // OR
  or:  [<condition>, <condition>, … ]
}
```

> **NOTE**: You can nest another `and` or `or` expression by including it as another condition. 

##### Examples

```json
{
  and: [
    { metadata_field_id: category_id, populated: true },
    { metadata_field_id: date_id, populated: false },
    { 
      or: [
        { metadata_field_id: role_id, includes: ["ext_1"] },
        { metadata_field_id: team_id, includes: ["ext_3", "ext_4"] },
      ]
    }
  ]
}
    // OR
{ metadata_field_id: role_id, populated: true }
```

---

#### Result structure

The result options are applied to the metadata field when the [condition](#condition_structure) is met. 

##### Syntax

```json
{
  enable: <boolean>,
  activate_values: <object>,  
  apply_value: <object>,
  set_mandatory: <boolean>
}
```

##### Parameters

One or more of the following actions can be applied: 

Action | Type | Description
---|---|---
enable | Boolean | Whether to enable the metadata field. You can disable a metadata field by default by setting `default_disabled` to true when [updating the metadata field](#update_a_metadata_field_by_external_id). See the note below for more information.**Important:** If the condition that sets `enable` to `true` is no longer met, the field reverts to its `default_disabled` state. This means the field is disabled from receiving input via the API, any previously entered values are cleared, and it’s hidden in the Media Library.
activate_values | Object | The values that will be available for an 'enum' or 'set' metadata field. Optionally, can use a string value of `"all"` to activate all the possible values.
apply_value | Object | The value to apply to the metadata field.
set_mandatory | Boolean | Whether to set the metadata field as mandatory.

> **NOTE**: In order to take advantage of the `enable: true` action, a field should first be set to disabled by default. This is done by using the [update metadata field](#update_a_metadata_field_by_external_id) method and setting the `default_disabled` parameter to `true`. Note that this parameter isn't documented in the update method, and should only be used together with a conditional metadata rule that can enable the field when a condition is met.

For example, to set a metadata field with the external_id 'category_id' to disabled by default:

```curl
curl \
  -H "Content-Type: application/json" \
  -d '{
    "default_disabled": true
  }' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/metadata_fields/category_id
```

##### activate_values

The `activate_values` action can be set to either activate all the values available (`"all"`) or you can specify an object detailing the list of available external IDs as an array of datasource values by their external ids, and the `mode` to either 'override' the existing values or to 'append' them to the current values.

```json
"all"   // activate all values
   // OR
{
  external_ids: array of <strings>,  // can be set to nil if nothing to be added
  mode: <enum>  // *override* exiting values or *append* to current values
}
```

##### apply_value

The `apply_value` action is used to apply a specified value for the metadata field. For multi-select (set) fields you can apply multiple values by giving an array of datasource external ids, and the `mode` to either apply them as the 'default' values or to 'append' them to the currently selected values.

```json
{
  value: <string> or array of <strings>, // array is for SET metadata fields only
  mode: <enum>  // relevant for SET metadata fields only: *default* or *append* 
}
```

##### Examples:

```json
{enable: true}

{enable: true, apply_value: { value: "private"}}

{apply_value: { value: ["beige", "brown"], mode: "append"}}  // for a set field

{enable: true, activate_values: "all" } 

{enable: false, activate_values: { external_ids: nil, mode: "override" }}

{activate_values: { external_ids: ["israel_ext", "germany_ext"], mode: "override" }
```

## ping

Run in Postman
Learn more about running Postman collections

Enables you to test the reachability of the Cloudinary API with the **ping** method.

Method | Description
---|---
GET<code class="code-method">/ping | [Pings Cloudinary servers.](#ping_cloudinary_servers)

---

### Ping Cloudinary servers

#### Syntax
`GET /ping`

```multi
|ruby 
Cloudinary::Api.ping

|php_2
$api->ping();

|python 
cloudinary.api.ping()

|nodejs
cloudinary.v2.api.ping().then(callback);

|java 
api.ping(ObjectUtils.emptyMap());

|csharp
Not supported by this SDK

|go
resp, err := cld.Admin.Ping(ctx)

|cli
cld admin ping
```

#### Sample response

The response contains the current status of the Cloudinary servers.

```json
{
 "status": "ok"
}

```

## resources

Run in Postman
Learn more about running Postman collections

Enables you to manage all the resources (assets) stored in your product environment.

Method | Description
---|---
GET<code class="code-method">/resources/:resource_type(/:type) | [Lists resources (assets) stored in your product environment.](#get_resources)
GET<code class="code-method">/resources/by_asset_folder | [Lists resources (assets) located in a specified asset folder.](#get_resources_by_asset_folder) Not supported for product environments using the legacy fixed folder mode.
GET<code class="code-method">/resources/by_asset_ids | [Lists resources (assets) based on the specified asset IDs.](#get_resources_by_asset_ids)
GET<code class="code-method">/resources/:resource\_type/tags/:tag | [Lists resources (assets) with a specified tag.](#get_resources_by_tag) 
GET<code class="code-method">/resources/:resource\_type/context/ |[Lists resources (assets) with a specified contextual metadata key.](#get_resources_by_context) 
GET<code class="code-method" style="font-size:smaller">/resources/:resource\_type/moderations/:moderation\_kind/:status | [Lists resources (assets) with a particular status from a specified moderation type.](#get_resources_in_moderation) 
GET<code class="code-method">/resources/:asset\_id | [Lists details of the asset with the specified asset ID, as well as all its derived assets.](#get_details_of_a_single_resource_by_asset_id)
GET<code class="code-method">/resources/:resource\_type/:type/:public\_id | [Lists details of the asset with the specified public ID, as well as all its derived assets.](#get_details_of_a_single_resource_by_public_id)
GET<code class="code-method">/resources/search | [Filters and retrieves information on all the resources (assets) in your product environment.](#search_for_resources)
GET<code class="code-method">/resources/visual\_search | [Finds images based on their visual content.](#visual_search_for_resources)
PUT<code class="code-method">/resources/:asset\_id | [Updates one or more attributes of a specified resource (asset) identified by its asset ID.](#update_details_of_an_existing_resource_by_asset_id)
POST<code class="code-method">/resources/:resource\_type/:type/:public\_id | [Updates one or more attributes of a specified resource (asset) identified by public ID.](#update_details_of_an_existing_resource)
POST<code class="code-method">/resources/restore | [Restores one or more resources (assets), identified by the unique and immutable asset ID, from backup.](#restore_resources_by_asset_id) 
POST<code class="code-method">/resources/:resource\_type/:type/restore | [Restores one or more resources (assets), identified by the public ID, from backup.](#restore_resources) 
POST<code class="code-method">/resources/:resource\_type/upload/update\_access\_mode | [Updates the access mode of resources (assets) by public ID, by tag, or by prefix. Deprecated.](#update_access_mode)
POST<code class="code-method">/resources/related\_assets/:asset\_id | [Relates assets by asset IDs.](#add_related_assets_by_asset_id)
POST<code class="code-method">/resources/related\_assets/:resource\_type/:type/:public\_id | [Relates assets by public IDs.](#add_related_assets)
DELETE<code class="code-method">/resources/related\_assets/:asset\_id | [Unrelates related assets by asset IDs.](#delete_related_assets_by_asset_id)
DELETE<code class="code-method">/resources/related\_assets/:resource\_type/:type/:public\_id | [Unrelates related assets by public IDs.](#delete_related_assets)
DELETE<code class="code-method">/resources/ | [Deletes resources (assets) by asset IDs.](#delete_resources_by_asset_id)
DELETE<code class="code-method">/resources/:resource\_type/:type | [Deletes resources (assets) by public IDs.](#delete_resources)
DELETE<code class="code-method">/resources/:resource\_type/tags/:tag | [Deletes resources (assets) by tags.](#delete_resources_by_tags)
DELETE<code class="code-method">/derived\_resources | [Deletes derived assets.](#delete_derived_resources)
DELETE<code class="code-method">/resources/backup/:asset\_id | [Deletes backed up versions of a resource.](#delete_backed_up_versions_of_a_resource)

---

### Get resources

Lists resources (assets) uploaded to your product environment.

#### Syntax
`GET /resources(/:resource_type(/:type))`

```multi
|ruby
Cloudinary::Api.resources(options = {})

|php_2
$api->assets($options = []);

|python
cloudinary.api.resources(**options)

|nodejs
cloudinary.v2.api.resources(options).then(callback);

|java
api.resources(Map options);

|csharp
cloudinary.ListResources(ListResourceParams params);

|go
resp, err := cld.Admin.Assets(ctx, admin.AssetsParams{})

|cli
cld admin resources 
```

#### Optional parameters
Parameter | Type | Description
---|---|---
resource\_type | String | The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image`, `raw`, `video`. **Default**: image.  
type | String | The delivery type, relevant as a parameter only when using the SDKs (the `type` is included in the endpoint URL when using the REST API). **Possible values**: `upload`, `private`, `authenticated`, `fetch`, `facebook`, `twitter`, `gravatar`, `youtube`, `hulu`, `vimeo`, `animoto`, `worldstarhiphop`, `dailymotion`, `list`. **Default**: upload.   
prefix | String | Find all assets with a public ID that starts with the specified prefix. The assets are sorted by public ID in the response. **Note**: use this parameter to find public IDs with a `+` character in them.
public\_ids | String[] | An array of public IDs. Get assets with the specified public IDs (up to 100). **Note**: Not supported for SDKs. Instead use the `resources_by_ids` SDK method. This parameter doesn't support public IDs with a `+` character in them (use the `prefix` parameter to find the assets instead). 
max\_results | Integers |  Maximum number of assets to return (up to 500). **Default**: `10`. 
next\_cursor | String | When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of a following request.
start\_at | String | Get assets that were created since the specified timestamp (ISO 8601 format). Supported unless `prefix` or `public_ids` were specified. For example: `2020-12-01`
direction | String/Integer | Control the order of returned assets, according to the `created_at` date. **Note**: if a `prefix` is specified, this parameter is ignored and the results are sorted by public ID. **Possible values**: `desc` or `-1` (default), `asc` or `1`. fields | String | A comma-separated list of fields to include in the response.**Notes**:- This parameter takes precedence over other parameters requesting details in the response (e.g., `tags` or `context`), so include them in this list if you also want their details returned.  - The following fields are always included in the response: `public_id`, and `asset_id`.tags | Boolean | Whether to include the list of tag names assigned to each asset. **Default**: `false`.
context | Boolean | Whether to include key-value pairs of contextual metadata associated with each asset. **Default**: `false`.
metadata | Boolean | Whether to include the structured metadata fields and values assigned to each asset. **Default**: `false`.
moderation | Boolean| Whether to include the image moderation status of each asset. **Default**: `false`.

#### Examples
Get all images:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image

|ruby
result = Cloudinary::Api
.resources

|php_2
$result = $api
->assets();

|python
result = cloudinary.api\
.resources()

|nodejs
cloudinary.v2.api
.resources()
.then(result=>console.log(result)); 

|java
result = api
.resources(ObjectUtils.emptyMap());

|csharp
result = cloudinary
.ListResources();

|go
resp, err := cld.Admin.Assets(ctx, admin.AssetsParams{})

|cli
cld admin resources
```

Get images of delivery type 'upload', up to a maximum of 30 results:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload

|ruby
result = Cloudinary::Api
.resources(
  type: "upload",
  max_results: 30)

|php_2
result = api
->assets(
  ["type" => "upload", "max_results" => 30]);

|python
result = cloudinary.api\
.resources(type = "upload", max_results = 30)

|nodejs
cloudinary.v2.api
.resources(
  { type: 'upload', max_results: 30 })
.then(result=>console.log(result)); 

|java
result = api
.resources(
  ObjectUtils.asMap("type", "upload", "max_results", 30));

|csharp
var listResourcesParams = new ListResourcesParams(){
  Type = "upload",
  MaxResults = 30};
var listResourcesResult = cloudinary.ListResources(listResourcesParams);

|go
resp, err := cld.Admin.Assets(ctx, admin.AssetsParams{
        DeliveryType:   "upload",
        MaxResults:     30})

|cli
cld admin resources type=upload
```

Get all uploaded images with a specified prefix:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload?prefix=sample

|ruby
result = Cloudinary::Api
.resources(
type: "upload", 
prefix: "sample")

|php_2
$result = $api
->assets([
  "type" => "upload", 
  "prefix" => "sample"]);

|python
result = cloudinary.api\
.resources(
type = "upload", 
prefix = "sample")

|nodejs
cloudinary.v2.api
.resources(
{ type: 'upload', 
  prefix: 'sample' })
.then(result=>console.log(result)); 

|java
result = api
.resources(
ObjectUtils.asMap(
  "type", "upload", 
  "prefix", "sample"));

|csharp
var listResourcesByPrefixParams = new ListResourcesByPrefixParams(){
  Type = "upload",
  Prefix = "sample"};
var listResourcesResult = cloudinary.ListResources(listResourcesByPrefixParams);

|go
resp, err := cld.Admin.Assets(ctx, admin.AssetsParams{
        DeliveryType: "upload",
        Prefix:       "sample"})

|cli
cld admin resources type=upload prefix=sample
```

Get Facebook images:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/facebook
 
|ruby
result = Cloudinary::Api
.resources(type: "facebook")

|php_2
$result = $api
>assets(["type" => "facebook"]);

|python
result = cloudinary.api\
.resources(type = "facebook")

|nodejs
cloudinary.v2
.api.resources(
  { type: 'facebook' })
.then(result=>console.log(result)); 

|java
result = api.resources(
  ObjectUtils.asMap("type", "facebook"));

|csharp
var listResourcesParams = new ListResourcesParams(){
  Type = "facebook"};
var listResourcesResult = cloudinary.ListResources(listResourcesParams);

|go
resp, err := cld.Admin.Assets(ctx, admin.AssetsParams{
        DeliveryType: "facebook"})

|cli
cld admin resources type=facebook
```

Get raw uploaded files:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/raw
       
|ruby
result = Cloudinary::Api
.resources(
  resource_type: "raw")

|php_2
$result = $api
->assets(["resource_type" => "raw"]);

|python
result = cloudinary.api\
.resources(resource_type = "raw")

|nodejs
cloudinary.v2.api
.resources(
  { resource_type: 'raw' })
.then(result=>console.log(result)); 

|java
result = api
.resources(
  ObjectUtils.asMap("resource_type", "raw"));

|csharp
var listResourcesParams = new ListResourcesParams(){
  ResourceType = "raw"};
var listResourcesResult = cloudinary.ListResources(listResourcesParams);

|go
resp, err := cld.Admin.Assets(ctx, admin.AssetsParams{
        AssetType:    "raw",
        DeliveryType: "upload"})

|cli
cld admin resources resource_type=raw
```
      
Get all uploaded images with the specified IDs:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload?public_ids[]=user_photo_1&public_ids[]=user_photo_2
        
|ruby
result = Cloudinary::Api
.resources_by_ids(["user_photo_1", "user_photo_2"])

|php_2
$result = $api
->assetsByIds(["user_photo_1", "user_photo_2"]);

|python
result = cloudinary\
.api.resources_by_ids(["user_photo_1", "user_photo_2"])

|nodejs
cloudinary.v2.api
.resources_by_ids(["user_photo_1", "user_photo_2"])
.then(result=>console.log(result)); 

|java
result = api
.resources_by_ids(Arrays.asList("user_photo_1", "user_photo_2"),
  ObjectUtils.emptyMap());

|csharp
var publicIds = new List<string>(){"user_photo_1", "user_photo_2" };
cloudinary.ListResourceByPublicIds(publicIds);

|go
resp, err := cld.Admin.AssetsByIDs(ctx, admin.AssetsByIDsParams{
      DeliveryType: "upload",
      PubicIDs:     []string{"user_photo_1", "user_photo_2"}})

|cli
cld admin resources_by_ids user_photo_1 user_photo2
```

#### Sample response
```json
{
  "resources": [
    {
      "asset_id": "ebfe9f427f4a6787ea00e00da9e67f9e",
      "public_id": "face_center",
      "format": "jpg",
      "version": 1719305903,
      "resource_type": "image",
      "type": "upload",
      "created_at": "2024-06-25T08:58:23Z",
      "bytes": 379132,
      "width": 1870,
      "height": 1250,
      "asset_folder": "",
      "display_name": "face_center",
      "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719305903/face_center.jpg",
      "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719305903/face_center.jpg"
    },
    {
      "asset_id": "a13dc5a232a28c03bf5881ac39b94d2c",
      "public_id": "65646572251",
      "format": "jpg",
      "resource_type": "image",
      "type": "facebook",
      "created_at": "2024-06-25T09:01:30Z",
      "bytes": 0,
      "asset_folder": "",
      "display_name": "65646572251",
      "url": "http://res.cloudinary.com/cld-docs/image/facebook/65646572251.jpg",
      "secure_url": "https://res.cloudinary.com/cld-docs/image/facebook/65646572251.jpg"
    }
  ]
}
```

---

### Get resources by asset folder
Returns all assets stored directly in a specified asset folder, regardless of the `public_id` paths or `resource_type` of those assets. This method doesn't return assets stored in sub-folders of the specified folder. The asset folder name isn't case sensitive.

> **NOTE**: Not supported for product environments using the legacy fixed folder mode.

#### Syntax:
`GET /resources/by_asset_folder`

```multi
|ruby
Cloudinary::Api.resources_by_asset_folder(asset_folder, options = {})
|php_2
$api->assetsByAssetFolder($asset_folder, $options = []);
cloudinary.api.resources_by_asset_folder(asset_folder, **options)
|nodejs
cloudinary.v2.api.resources_by_asset_folder(asset_folder, options, callback);
|java
api.resourcesByAssetFolder(String asset_folder, Map options);
|csharp
cloudinary.ListResourcesByAssetFolder(ListResourcesByAssetFolder params); 
|go
resp, err := cld.Admin.AssetsByAssetFolder(ctx, admin.AssetsByAssetFolderParams{})
|cli
cld admin resources_by_asset_folder $asset_folder $options
```

#### Required parameters
Parameter | Type | Description
---|---|---
asset\_folder | String  |  The name of the asset folder.

#### Optional parameters
Parameter | Type | Description
---|---|---
max\_results | Integer | Maximum number of assets to return (maximum=500). **Default**: `50`. 
next\_cursor | String |  When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of the following request.
direction | String/Integer | Control the order of returned assets, according to the `created_at` date. **Note**: if a `prefix` is specified, this parameter is ignored and the results are sorted by public ID. **Possible values**: `desc` or `-1` (default), `asc` or `1`. fields | String | A comma-separated list of fields to include in the response.**Notes**:- This parameter takes precedence over other parameters requesting details in the response (e.g., `tags` or `context`), so include them in this list if you also want their details returned.  - The following fields are always included in the response: `public_id`, and `asset_id`.tags | Boolean | Whether to include the list of tag names assigned to each asset. **Default**: `false`.
context | Boolean | Whether to include key-value pairs of contextual metadata associated with each asset. **Default**: `false`.
metadata | Boolean | Whether to include the structured metadata fields and values assigned to each asset. **Default**: `false`.
moderations | Boolean | Whether to include image moderation status of each asset. **Default**: `false`.

#### Example
Get all assets in the 'technology' asset folder. In the response, include the tags and metadata associated with each asset:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/by_asset_folder?asset_folder=technology&tags=true&metadata=true
       
|ruby
Cloudinary::Api.resources_by_asset_folder('technology'
  tags: true, 
  metadata: true)
|php_2
$api->assetsByAssetFolder("technology"
  "tags" => true, 
  "metadata" => true]);
cloudinary.api.resources_by_asset_folder("technology"
  tags = true, 
  metadata = true)
|nodejs
cloudinary.v2.api.resources_by_asset_folder("technology", 
  { tags: true, 
    metadata: true }, 
function(error, result) {console.log(result, error); });
|java
api.resourcesByAssetFolder("technology", 
ObjectUtils.asMap(
  "tags", true, 
  "metadata", true));

|csharp
var assetFolderParams = new ListResourcesByAssetFolderParams(){
  AssetFolder = "technology",
  Tags = true,
  Metadata = true};
var assetFolderResult = cloudinary.ListResourcesByAssetFolder(assetFolderParams);   

|go
resp, err := cld.Admin.AssetsByAssetFolder(ctx, admin.AssetsByAssetFolderParams{
		AssetFolder: "technology",
		Tags:        api.Bool(true)})
|cli
cld admin resources_by_asset_folder technology tags=true metadata=true
```

### Get resources by asset IDs
Returns details of the assets with the specified asset IDs. This enables you to get assets by their immutable identifiers, regardless of resource type, type, public ID, display name, or asset folder. 

#### Syntax:
`GET /resources/by_asset_ids`

```multi
|ruby
Cloudinary::Api.resources_by_asset_ids(asset_ids, options = {})
|php_2
$api->assetsByAssetIds($asset_ids, $options = []);
cloudinary.api.resources_by_asset_ids(**asset_ids, **options)
|nodejs
cloudinary.v2.api.resources_by_asset_ids(asset_ids, options, callback);
|java
api.resourcesByAssetIds(Map asset_ids, Map options);
|csharp
cloudinary.ListResourcesByAssetIDs(ListResourcesByAssetIdsParams params);
|go
resp, err := cld.Admin.AssetsByAssetIDs(ctx, admin.AssetsByAssetIDsParams{})
|cli
cld admin resources_by_asset_ids (asset_ids) 
```

#### Required parameters
Parameter | Type | Description
---|---|---
asset\_ids | String[]  | An array of asset IDs. Maximum 10.

#### Optional parameters
Parameter | Type | Description
---|---|---
direction | String/Integer | The order of returned assets, according to the `created_at` date. **Note**: if a `prefix` is specified, this parameter is ignored and the results are sorted by public ID. **Possible values**: `desc` or `-1` (default), `asc` or `1`. fields | String | A comma-separated list of fields to include in the response.**Notes**:- This parameter takes precedence over other parameters requesting details in the response (e.g., `tags` or `context`), so include them in this list if you also want their details returned.  - The following fields are always included in the response: `public_id`, and `asset_id`.tags | Boolean | Whether to include the list of tag names assigned to each asset. **Default**: `false`.
context | Boolean | Whether to include key-value pairs of contextual metadata associated with each asset. **Default**: `false`.
metadata | Boolean | Whether to include the structured metadata fields and values assigned to each asset. **Default**: `false`.
moderations | Boolean | Whether to include image moderation status of each asset. **Default**: `false`.

#### Example
Get the details of two assets by their specified asset IDs.

```multi
|curl
curl \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/by_asset_ids?asset_ids[]=e12345b5c456c8901bbb0efc00c0fcf&asset_ids[]=f12345a5c789c1234bbb0efc00c0f12
|ruby
Cloudinary::Api.resources_by_asset_ids(["e12345b5c456c8901bbb0efc00c0fcf", "f12345a5c789c1234bbb0efc00c0f12"])
|php_2
$api->assetsByAssetIds(["e12345b5c456c8901bbb0efc00c0fcf", "f12345a5c789c1234bbb0efc00c0f12"]);
cloudinary.api.resources_by_asset_ids(["e12345b5c456c8901bbb0efc00c0fcf", "f12345a5c789c1234bbb0efc00c0f12"])
|nodejs
cloudinary.v2.api.resources_by_asset_ids(["e12345b5c456c8901bbb0efc00c0fcf", "f12345a5c789c1234bbb0efc00c0f12"],
  function(error, result) {console.log(result, error); });
|java
cloudinary.api().resourcesByAssetIds(Arrays.asList("e12345b5c456c8901bbb0efc00c0fcf", "f12345a5c789c1234bbb0efc00c0f12"),
  ObjectUtils.emptyMap());
|csharp
var assetIds = new List<string>(){"e12345b5c456c8901bbb0efc00c0fcf", "f12345a5c789c1234bbb0efc00c0f12"};
cloudinary.ListResourcesByAssetIDs(assetIds);
|go
resp, err := cld.Admin.AssetsByAssetIDs(ctx, admin.AssetsByAssetIDsParams{
		  AssetIDs: []string{"e12345b5c456c8901bbb0efc00c0fcf", "f12345a5c789c1234bbb0efc00c0f12"}})
|cli
cld admin resources_by_asset_ids e12345b5c456c8901bbb0efc00c0fcf f12345a5c789c1234bbb0efc00c0f12
```

---
### Get resources by tag

Lists resources (assets) with a specified tag. This method doesn't return deleted assets even if they have been backed up.

> **TIP**: You can also return a JSON listing of resources (assets) by tag in your front-end code using the [client-side asset lists](list_assets#client_side_asset_lists) delivery option.

#### Syntax
`GET /resources/:resource_type/tags/:tag`

```multi
|ruby
Cloudinary::Api.resources_by_tag(tag, options = {})

|php_2
$api->assetsByTag($tag, $options = []);
|python
cloudinary.api.resources_by_tag(tag, **options)

|nodejs
cloudinary.v2.api.resources_by_tag(tag, options).then(callback);

|java
api.resourcesByTag(String tag, Map options);

|csharp
cloudinary.ListResourcesByTag(ListResourcesByTagParams params); 

|go
resp, err := cld.Admin.AssetsByTag(ctx, admin.AssetsByTagParams{})

|cli
cld admin resources_by_tag (tag)
```

#### Required parameters
Parameter | Type | Description
---|---|---
tag | String  |  The assets to return that have this tag.

#### Optional parameters
Parameter | Type | Description
---|---|---
resource\_type | String | The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.          
max\_results | Integer | Maximum number of assets to return (maximum=500). **Default**: `10`. 
next\_cursor | String |  When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of the following request.
direction | String/Integer | Control the order of returned assets, according to the `created_at` date. **Note**: if a `prefix` is specified, this parameter is ignored and the results are sorted by public ID. **Possible values**: `desc` or `-1` (default), `asc` or `1`. fields | String | A comma-separated list of fields to include in the response.**Notes**:- This parameter takes precedence over other parameters requesting details in the response (e.g., `tags` or `context`), so include them in this list if you also want their details returned.  - The following fields are always included in the response: `public_id`, and `asset_id`.tags | Boolean | Whether to include the list of tag names assigned to each asset. **Default**: `false`.
context | Boolean | Whether to include key-value pairs of contextual metadata associated with each asset. **Default**: `false`.
metadata | Boolean | Whether to include the structured metadata fields and values assigned to each asset. **Default**: `false`.
moderations | Boolean | Whether to include image moderation status of each asset. **Default**: `false`.

#### Examples
Get all images by tag:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/tags/mytag
       
|ruby
result = Cloudinary::Api
.resources_by_tag('mytag')

|php_2
$result = $api
->assetsByTag("mytag");

|python
result = cloudinary.api\
.resources_by_tag("mytag")

|nodejs
cloudinary.v2.api
.resources_by_tag("mytag")
.then(result=>console.log(result)); 

|java
result = api
.resourcesByTag("mytag", ObjectUtils.emptyMap());

|csharp
result = cloudinary
.ListResourcesByTag("mytag");   

|go
resp, err := cld.Admin.AssetsByTag(ctx, admin.AssetsByTagParams{Tag: "mytag"})

|cli
cld admin resources_by_tag mytag
```

Get all raw files by tag:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/raw/tags/mytag

|ruby
result = Cloudinary::Api
.resources_by_tag('mytag',
  resource_type: "raw")

|php_2
$result = $api
->assetsByTag("mytag", ["resource_type" => "raw"]);

|python
result = cloudinary.api\
.resources_by_tag("mytag",
resource_type = "raw")

|nodejs
cloudinary.v2.api
.resources_by_tag("mytag", 
  { resource_type: 'raw'})
.then(result=>console.log(result)); 

|java
result = api
.resourcesByTag("mytag", 
  ObjectUtils.asMap("resource_type", "raw"));

|csharp
var listResourcesParams = new ListResourcesByTagParams(){
  Tag = "mytag",
  ResourceType = "raw"};
var listResourcesResult = cloudinary.ListResources(ListResourcesByTagParams);

|go
resp, err := cld.Admin.AssetsByTag(ctx, admin.AssetsByTagParams{
        Tag:          "mytag",
        DeliveryType: "raw"})

|cli
cld admin resources_by_tag mytag resource_type=raw
```

---

### Get resources by context

Retrieves resources (assets) with a specified contextual metadata key. This method doesn't return deleted assets even if they have been backed up.

#### Syntax
`GET /resources/:resource_type/context/`

```multi
|ruby
Cloudinary::Api.resources_by_context(key, options = {})

|php_2
$api->assetsByContext($key, $options = []);

|python
cloudinary.api.resources_by_context(key, **options)

|nodejs
cloudinary.v2.api.resources_by_context(key, options).then(callback);

|java
api.resourcesByContext(String key, Map options);

|csharp
Not supported by this SDK 

|go
resp, err := cld.Admin.AssetsByContext(ctx, admin.AssetsByContextParams{})

|cli
cld admin resources_by_context $key $options
```

#### Required parameters
Parameter | Type | Description
---|---|---
key | String | Only assets with this contextual metadata key are returned.

#### Optional parameters
Parameter | Type | Description
---|---|---
resource\_type | String | The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.  
value | String | Only assets with this value for the contextual metadata key are returned. If this parameter isn't provided, all assets with the specified contextual metadata key are returned, regardless of the actual value of the key.
max\_results | Integer | Maximum number of assets to return (maximum=500). **Default**: `10`. 
next\_cursor | String |  When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of the following request.
direction | String/Integer | Control the order of returned assets, according to the `created_at` date. **Note**: if a `prefix` is specified, this parameter is ignored and the results are sorted by public ID. **Possible values**: `desc` or `-1` (default), `asc` or `1`. fields | String | A comma-separated list of fields to include in the response.**Notes**:- This parameter takes precedence over other parameters requesting details in the response (e.g., `tags` or `context`), so include them in this list if you also want their details returned.  - The following fields are always included in the response: `public_id`, and `asset_id`.tags | Boolean | Whether to include the list of tag names assigned to each asset. **Default**: `false`.
context | Boolean | Whether to include key-value pairs of contextual metadata associated with each asset. **Default**: `false`.
metadata | Boolean | Whether to include the structured metadata fields and values assigned to each asset. **Default**: `false`.
moderations | Boolean | Whether to include image moderation status of each asset. **Default**: `false`.

#### Examples
Get images by contextual metadata key:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/context?key=mycontextkey
        
|ruby
result = Cloudinary::Api
.resources_by_context('mycontextkey')

|php_2
$result = $api
->assetsByContext("mycontextkey");

|python
result = cloudinary.api\
.resources_by_context("mycontextkey")

|nodejs
cloudinary.v2.api
.resources_by_context("mycontextkey")
.then(result=>console.log(result)); 

|java
result = api
.resourcesByContext("mycontextkey", ObjectUtils.emptyMap());

|csharp
Not supported by this SDK

|go
resp, err := cld.Admin.AssetsByContext(ctx, admin.AssetsByContextParams{
		Key: "mycontextkey"})

|cli
cld admin resources_by_context "mycontextkey"
```

Get video files by contextual metadata key and value:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/video/context?key=mycontextkey&value=mycontextvalue

|ruby
result = Cloudinary::Api
.resources_by_context('mycontextkey', 'mycontextvalue',
  resource_type: "video")

|php_2
$result = $api
->assetsByContext("mycontextkey", "mycontextvalue"
  ["resource_type" => "video"]);

|python
result = cloudinary.api\
.resources_by_context("mycontextkey", "mycontextvalue"
  resource_type = "video")

|nodejs
cloudinary.v2.api
.resources_by_context("mycontextkey", "mycontextvalue", 
  { resource_type: 'video'})
.then(result=>console.log(result)); 

|java
result = api.resourcesByContext("mycontextkey", "mycontextvalue", 
  ObjectUtils.asMap("resource_type", "video"));

|csharp
Not supported by this SDK

|go
resp, err := cld.Admin.AssetsByContext(ctx, admin.AssetsByContextParams{
      Key:            "mycontextkey", 
      Value:          "mycontextvalue",
      DeliveryType:   "video"})

|cli
cld admin resources_by_context "mycontextkey" value="mycontextvalue" resource_type="video"
```

---

### Get resources in moderation 

Retrieves resources (assets) with a particular status from a specified moderation type.

#### Syntax
`GET /resources/:resource_type/moderations/:moderation_kind/:status`

```multi  
|ruby
Cloudinary::Api.resources_by_moderation(moderation_kind, status, options = {})

|php_2
$api->assetsByModeration($moderation_kind, $status, $options = []);

|python
cloudinary.api.resources_by_moderation(moderation_kind, status, **options)

|nodejs
cloudinary.v2.api.resources_by_moderation(moderation_kind, status, options).then(callback);

|java
cloudinary.api().resourcesByModeration(String moderation_kind, String status, Map options);

|csharp
cloudinary.ListResourcesByModerationStatus(ModerationStatus Params);

|go
resp, err := cld.Admin.AssetsByModeration(ctx, admin.AssetsByModerationParams{})

|cli
cld admin resources_by_moderation (moderation_kind, status) 
```

#### Required parameters
Parameter | Type | Description
---|---|---
moderation\_kind | String | The type of moderation list to retrieve. **Possible values**: `manual`, `webpurify`, `aws_rek`, `aws_rek_video`, `perception_point`, `google_video_moderation`, `duplicate`. 
status | String| The moderation status of assets to retrieve. **Possible values**: `pending`, `approved`, `rejected`, `queued`, `aborted`.Note: `queued` and `aborted` are relevant only when an asset is marked for [multiple moderations](moderate_assets#multiple_moderations).

#### Optional parameters
Parameter | Type | Description
---|---|---
resource\_type | String | The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.         
max\_results | Integer | Maximum number of assets to return (maximum=500). **Default**: `10`. 
next\_cursor | String |  When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of the following request.
direction | String/Integer | Control the order of returned assets, according to the `created_at` date. **Note**: if a `prefix` is specified, this parameter is ignored and the results are sorted by public ID. **Possible values**: `desc` or `-1` (default), `asc` or `1`. fields | String | A comma-separated list of fields to include in the response.**Notes**:- This parameter takes precedence over other parameters requesting details in the response (e.g., `tags` or `context`), so include them in this list if you also want their details returned.  - The following fields are always included in the response: `public_id`, and `asset_id`.tags | Boolean | Whether to include the list of tag names assigned to each asset. **Default**: `false`.
context | Boolean | Whether to include key-value pairs of contextual metadata associated with each asset. **Default**: `false`.
metadata | Boolean | Whether to include the structured metadata fields and values assigned to each asset. **Default**: `false`.
moderations | Boolean | Whether to include image moderation status of each asset. **Default**: `false`.

#### Examples
Get images pending manual moderation:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/moderations/manual/pending
        
|ruby
result = Cloudinary::Api
.resources_by_moderation("manual", "pending")

|php_2
$result = $api
->assetsByModeration("manual", "pending");

|python
result = cloudinary.api\
.resources_by_moderation("manual", "pending")

|nodejs
cloudinary.v2.api
.resources_by_moderation('manual', 'pending')
.then(result=>console.log(result)); 

|java
result = cloudinary.api()
.resourcesByModeration("manual", "pending",
  ObjectUtils.emptyMap());

|csharp
result = cloudinary
.ListResourcesByModerationStatus("manual", "pending");

|go
resp, err := cld.Admin.AssetsByModeration(ctx, admin.AssetsByModerationParams{
      Kind:   "manual", 
      Status: "pending"})

|cli
cld admin resources_by_moderation manual pending
```
      
Get images automatically approved by the WebPurify add-on:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/moderations/webpurify/approved
        
|ruby
result = Cloudinary::Api
.resources_by_moderation("webpurify", "approved")

|php_2
$result = $api
->assetsByModeration("webpurify", "approved");

|python
result = cloudinary\
.api.resources_by_moderation("webpurify", "approved")

|nodejs
cloudinary.v2.api
.resources_by_moderation('webpurify', 'approved')
.then(result=>console.log(result)); 

|java
result = cloudinary.api()
.resourcesByModeration("webpurify", "approved",
  ObjectUtils.emptyMap());

|csharp
result = cloudinary
.ListResourcesByModerationStatus("webpurify", "approved");

|go
resp, err := cld.Admin.AssetsByModeration(ctx, admin.AssetsByModerationParams{
      Kind:   "webpurify", 
      Status: "approved"})

|cli
cld admin resources_by_moderation webpurify approved
```

#### Sample response
```json
{
  "resources": [
    {
      "asset_id": "67007692e3ea847ea9c185d3713c42e3",
      "public_id": "oq1ogps8skjshnnupvah",
      "format": "jpg",
      "version": 1719306574,
      "resource_type": "image",
      "type": "upload",
      "created_at": "2024-06-25T09:09:34Z",
      "bytes": 379132,
      "width": 1870,
      "height": 1250,
      "asset_folder": "",
      "display_name": "oq1ogps8skjshnnupvah",
      "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719306574/oq1ogps8skjshnnupvah.jpg",
      "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719306574/oq1ogps8skjshnnupvah.jpg",
      "moderation_kind": "manual",
      "moderation_status": "pending"
    },
    {
      "asset_id": "0fcf92cf388ec860082c1fad97ed76e6",
      "public_id": "acycvvfw8reiy0apmqrh",
      "format": "jpg",
      "version": 1719306567,
      "resource_type": "image",
      "type": "upload",
      "created_at": "2024-06-25T09:09:27Z",
      "bytes": 379132,
      "width": 1870,
      "height": 1250,
      "asset_folder": "",
      "display_name": "acycvvfw8reiy0apmqrh",
      "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719306567/acycvvfw8reiy0apmqrh.jpg",
      "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719306567/acycvvfw8reiy0apmqrh.jpg",
      "moderation_kind": "manual",
      "moderation_status": "pending"
    }
  ]
}
```

---
### Get details of a single resource by asset ID
Returns the details of the asset with the specified asset ID, including details on all derived assets. This enables you to get all details of an asset by its unique and immutable identifier, regardless of public ID, display name, asset folder, resource type or deliver type.

#### Syntax
`GET /resources/:asset_id`

```multi
|ruby
Cloudinary::Api.resource_by_asset_id(asset_id, options = {})
|php_2
$api->assetByAssetId($asset_id, $options = []);
|python
cloudinary.api.resource_by_asset_id(asset_id, **options)
|nodejs
cloudinary.v2.api.resource_by_asset_id(asset_id, options, callback);
|java
api.resourceByAssetId(String asset_id, Map options);
|csharp
cloudinary.GetResourceByAssetID(GetResourceByAssetIDParams params); 
|go
resp, err := cld.Admin.AssetByAssetID(ctx, admin.AssetByAssetIDParams{})
|cli
cld admin resource_by_asset_id (asset_id)
```

#### Optional parameters
Parameter | Type | Description
---|---|---
colors | Boolean |  Whether to include color information: predominant colors and histogram of 32 leading colors. **Default**: `false`.
image\_metadata | Boolean | Whether to include IPTC, XMP, and detailed Exif metadata in the response. **Default**: `false`.This parameter applies to both `image` and `video` asset types (including audio files). The exact set of metadata fields that gets returned for an asset depends on the asset type.**Note**: Using this parameter also returns the asset's **ETag** value for all asset types, including **raw**.
faces | Boolean |  Whether to include a list of coordinates of detected faces. **Default**: `false`.
quality\_analysis | Boolean| Whether to return [quality analysis](image_quality_analysis) scores for the image. **Default**: `false`.
accessibility\_analysis | Boolean| Whether to return [accessibility analysis](accessibility_analysis) scores for the image. **Default**: `false`.
pages | Boolean |  Whether to report the number of pages in multi-page documents (e.g., PDF). **Default**: `false`.
phash | Boolean |  Whether to include the perceptual hash (pHash) of the uploaded photo for image similarity detection. **Default**: `false`.
coordinates | Boolean | Whether to include previously specified custom cropping coordinates and faces coordinates. **Default**: `false`.
versions | Boolean | Whether to include details of all the [backed up versions](backups_and_version_management#versioning) of the asset. Note that requesting details of backed up versions consumes an *additional* 10 units of your [rate limit](#usage_limits) for that call (11 total).  **Default**: `false`.
max\_results | Integer | Maximum number of derived assets to return (maximum=500). **Default**: `10`. 
derived\_next\_cursor | String  | If there are more derived images than `max_results`, the `derived_next_cursor` value is returned as part of the response. You can then specify this value as the `derived_next_cursor` parameter of the following  request.

#### Examples
Get details of the asset with the specified asset ID, including faces, colors, image metadata and versions details:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/e12345b5c456c8901bbb0efc00c0fcf?faces=1&colors=1&image_metadata=1&versions=1
        
|ruby
Cloudinary::Api.resource_by_asset_id('e12345b5c456c8901bbb0efc00c0fcf',
  faces: true, 
  colors: true, 
  image_metadata: true,
  versions: true)
|php_2
$api->assetByAssetId("e12345b5c456c8901bbb0efc00c0fcf", [
    "faces" => true, 
    "colors" => true, 
    "image_metadata" => true,
    "versions" => true]);
|python
cloudinary.api.resource_by_asset_id("e12345b5c456c8901bbb0efc00c0fcf",
  faces = True, 
  colors = True, 
  image_metadata = True,
  versions = True)
|nodejs
cloudinary.v2.api.resource_by_asset_id('e12345b5c456c8901bbb0efc00c0fcf', 
  { faces: true, 
    colors: true, 
    image_metadata: true,
    versions: true },
  function(error, result) {console.log(result, error); });
|java
api.resourceByAssetId("e12345b5c456c8901bbb0efc00c0fcf", 
  ObjectUtils.asMap(
    "faces", true,
    "colors", true, 
    "image_metadata", true,
    "versions", true));
|csharp
var getResourceByAssetID = new GetResourceByAssetIDParams("e12345b5c456c8901bbb0efc00c0fcf"){
  Faces = true,
  Colors = ImageMetadata = Versions = true };
var info = cloudinary.GetResourceByAssetID(getResourceByAssetID);
|go
resp, err := cld.Admin.AssetByAssetID(ctx, admin.AssetByAssetIDParams{
        PublicID:       "e12345b5c456c8901bbb0efc00c0fcf",
        Faces:          api.Bool(true),
        Colors:         api.Bool(true),
        ImageMetadata:  api.Bool(true),
        Versions:       api.Bool(true)})
|cli
cld admin resource_by_asset_id e12345b5c456c8901bbb0efc00c0fcf faces=true colors=true image_metadata=true versions=true
```

---

### Get details of a single resource by public ID

Retrieves details of the requested resource (asset), the date and time that specific changes were made to asset attributes, and details of all derived assets.  

`GET /resources/:resource_type/:type/:public_id`

#### Syntax
```multi
|ruby
Cloudinary::Api.resource(public_id, options = {})

|php_2
$api->asset($public_id, $options = []);

|python
cloudinary.api.resource(public_id, **options)

|nodejs
cloudinary.v2.api.resource(public_id, options).then(callback);

|java
api.resource(String public_id, Map options);

|csharp
cloudinary.GetResource(ResourceParams params); 

|go
resp, err := cld.Admin.Asset(ctx, admin.AssetParams{})

|cli
cld admin resource (public_id)
```

#### Required parameters
Parameter | Type | Description
---|---|---
public\_id | String | The public ID of the asset.
      

#### Optional parameters
Parameter | Type | Description
---|---|---
resource\_type | String| The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.
type | String |  The delivery type, relevant as a parameter only when using the SDKs (the `type` is included in the endpoint URL when using the REST API). **Possible values**: `upload`, `private`, `authenticated`, `facebook`, `twitter`, `gravatar`, `youtube`, `hulu`, `vimeo`, `animoto`, `worldstarhiphop`, `dailymotion`, `list`. **Default**: `upload`                      
colors | Boolean |  Whether to include color information: predominant colors and histogram of 32 leading colors. **Default**: `false`.
media\_metadata | Boolean | Whether to include IPTC, XMP, and detailed Exif metadata in the response. **Default**: `false`.This parameter applies to both `image` and `video` asset types (including audio files). The exact set of metadata fields that gets returned for an asset depends on the asset type.**Note**: Using this parameter also returns the asset's **ETag** value for all asset types, including **raw**.
exif | Boolean |  Deprecated. Use `media_metadata` instead. **Default**: `false`.
image\_metadata | Boolean | Deprecated. Use `media_metadata` instead. **Default**: `false`.
faces | Boolean |  Whether to include a list of coordinates of detected faces. **Default**: `false`.
quality\_analysis | Boolean| Whether to return [quality analysis](image_quality_analysis) scores for the image. **Default**: `false`.
accessibility\_analysis | Boolean| Whether to return [accessibility analysis](accessibility_analysis) scores for the image. **Default**: `false`.
pages | Boolean |  Whether to report the number of pages in multi-page documents (e.g., PDF). **Default**: `false`.
phash | Boolean |  Whether to include the perceptual hash (pHash) of the uploaded photo for image similarity detection. **Default**: `false`.
coordinates | Boolean | Whether to include previously specified custom cropping coordinates and faces coordinates. **Default**: `false`.
versions | Boolean | Whether to include details of all the [backed up versions](backups_and_version_management#versioning) of the asset. Note that requesting details of backed up versions consumes an *additional* 10 units of your [rate limit](#usage_limits) for that call (11 total).  **Default**: `false`.
related | Boolean | Whether to include the list of assets [related](#add_related_assets) to this asset. **Default**: `false`.
related\_next\_cursor | String | If there are more than 100 `related` assets, the `related_next_cursor` value is returned as part of the response. You can then specify this value as the `related_next_cursor` parameter of the following  request. 
max\_results | Integer | Maximum number of derived assets to return (maximum=500). **Default**: `10`. 
derived\_next\_cursor | String  | If there are more derived images than `max_results`, the `derived_next_cursor` value is returned as part of the response. You can then specify this value as the `derived_next_cursor` parameter of the following  request.

#### Examples
Uploaded image details:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload/sample
       
|ruby
result = Cloudinary::Api
.resource('sample')

|php_2
$result = $api
->asset("sample");

|python
result = cloudinary\
.api.resource("sample")

|nodejs
cloudinary.v2.api
.resource('sample')
.then(result=>console.log(result)); 

|java
result = api.resource("sample", ObjectUtils.emptyMap());

|csharp
result = cloudinary.GetResource("sample");

|go
resp, err := cld.Admin.Asset(ctx, admin.AssetParams{PublicID: "sample"})

|cli
cld admin resource sample
```

Faces, colors, media metadata and versions details:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload/sample?faces=1&colors=1&media_metadata=1&versions=1
        
|ruby
result = Cloudinary::Api
.resource('sample',
  faces: true, 
  colors: true, 
  media_metadata: true,
  versions: true)

|php_2
$result = $api
->asset("sample", [
    "faces" => true, 
    "colors" => true, 
    "media_metadata" => true,
    "versions" => true]);

|python
result = cloudinary.api\
.resource("sample",
  faces = True, 
  colors = True, 
  media_metadata = True,
  versions = True)

|nodejs
cloudinary.v2.api
.resource('sample', 
  { faces: true, 
    colors: true, 
    media_metadata: true,
    versions: true })
.then(result=>console.log(result)); 

|java
result = api
.resource("sample", 
  ObjectUtils.asMap(
    "faces", true,
    "colors", true, 
    "media_metadata", true,
    "versions", true));

|csharp
var getResource = new GetResourceParams("sample"){
  Faces = true,

Colors = ImageMetadata = Versions = true };
var info = cloudinary.GetResource(getResource);

|go
resp, err := cld.Admin.Asset(ctx, admin.AssetParams{
        PublicID:       "sample",
        Faces:          api.Bool(true),
        Colors:         api.Bool(true),
        ImageMetadata:  api.Bool(true),
        Versions:       api.Bool(true)})

|cli
cld admin resource sample faces=true colors=true media_metadata=true versions=true
```

Facebook picture details:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/facebook/4

|ruby
result = Cloudinary::Api
.resource('4', 
  type: "facebook")

|php_2
$result = $api
->asset("4", 
  ["type" => "facebook"]);

|python
result = cloudinary.api\
.resource("4", 
  type = "facebook")

|nodejs
cloudinary.v2.api
.resource('4', 
  { type: 'facebook' })
.then(result=>console.log(result)); 

|java
result = api
.resource("4", 
  ObjectUtils.asMap("type", "facebook"));

|csharp
var getResource = new GetResourceParams("4"){
Type = "facebook" };
var info = cloudinary.GetResource(getResource);

|go
resp, err := cld.Admin.Asset(ctx, admin.AssetParams{
        PublicID:       "sample",
        DeliveryType:   "facebook"})

|cli
cld admin resource "4" type=facebook
```

Uploaded raw file details:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/raw/upload/rwkaliebnufp3bxyrvyo.txt

|ruby
result = Cloudinary::Api
.resource('rwkaliebnufp3bxyrvyo.txt',
  resource_type: "raw")

|php_2
$result = $api
->asset("rwkaliebnufp3bxyrvyo.txt",
  ["resource_type" => "raw"]);

|python
result = cloudinary.api\
.resource("rwkaliebnufp3bxyrvyo.txt",
  resource_type = "raw")

|nodejs
cloudinary.v2.api
.resource('rwkaliebnufp3bxyrvyo.txt', 
  { resource_type: 'raw'})
.then(result=>console.log(result)); 

|java
result = api.resource("rwkaliebnufp3bxyrvyo.txt",
  ObjectUtils.asMap("resource_type", "raw"));

|csharp
var getResource = new GetResourceParams("rwkaliebnufp3bxyrvyo.txt"){
ResourceType = "raw" };
var info = cloudinary.GetResource(getResource);

|go
resp, err := cld.Admin.Asset(ctx, admin.AssetParams{
        PublicID:   "rwkaliebnufp3bxyrvyo.txt",
        AssetType:  "raw"})

|cli
cld admin resource rwkaliebnufp3bxyrvyo.txt resource_type=raw
```

#### Sample response
This sample response is from a GET resource call that requested faces, colors and versions in the response.

    
```json
{
    "asset_id": "03a5b92135161439031d3834c04bc31b",
    "public_id": "sample",
    "format": "jpg",
    "version": 1719304854,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2021-06-25T08:40:54Z",
    "bytes": 120253,
    "width": 864,
    "height": 576,
    "asset_folder": "",
    "display_name": "sample",
    "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719304854/sample.jpg",
    "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719304854/sample.jpg",
    "tags": [
      "flower",
      "plant",
      "nature"
    ],
    "context": {
      "custom": {
        "alt": "sample flower",
        "caption": "beautiful flower"
      }
    },
    "metadata": {
      "approval_status_0": "status_new",
      "categories_0": [
          "cat_mens_clothes",
          "cat_shirts",
          "qzaihnfnasrzba0qrdpr"
      ],
      "owner_0": "Adam Adams",
      "product_id_0": 12345,
      "publish_date_0": "2022-02-17"
    },
    "last_updated": {
      "access_control_updated_at": "2022-10-13T03:49:21Z",
      "context_updated_at": "2022-11-10T06:05:21Z",
      "metadata_updated_at": "2022-10-14T06:40:13Z",
      "public_id_updated_at": "2022-12-11T05:41:21Z",
      "tags_updated_at": "2022-12-14T06:09:21Z", 
      "updated_at": "2022-12-14T06:09:21Z"
    },
    "next_cursor": "041a39fc10971b9eabd4993470f6bfaf",
    "derived": [
      {
        "transformation": "c_fill,w_100,h_100",
        "format": "jpg",
        "bytes": 7112,
        "id": "8267a869b62a93a59248f35d7f124c1f",
        "url": "http://res.cloudinary.com/cld-docs/image/upload/c_fill,w_100,h_100/v1312461204/sample.jpg",
        "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/c_fill,w_100,h_100/v1312461204/sample.jpg"
      },
      {
        "transformation": "w_230,h_168,c_fit",
        "format": "jpg",
        "bytes": 19173,
        "id": "383e22a57167445552a3cdc16f0a0c85",
        "url": "http://res.cloudinary.com/cld-docs/image/upload/w_230,h_168,c_fit/v1312461204/sample.jpg",
        "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/w_230,h_168,c_fit/v1312461204/sample.jpg"
      }
    ],
    "etag": "619dfd2901577eb4259f91a2c0e43dac",
    "faces": [[98,74,61,83], [140,130,52,71]],
    "illustration_score": 0.0,
    "semi_transparent": false,
    "grayscale": false,
    "colors": [["#162E02",6.7], ["#385B0C",6.3], ["#F3285C",5.0], ["#B3CB6E",5.0], ["#688F1C",4.4], ["#324D07",4.4], ["#8EAA34",4.3], ["#4F6D0D",4.2], ["#789446",4.1], ["#DF1327",3.9], ["#A10B12",3.7], ["#273804",3.4], ["#0D1802",3.4], ["#D5E191",3.2], ["#646E20",3.1], ["#94AF4D",2.9], ["#FB54A9",2.8], ["#48570B",2.7], ["#ACC655",2.7], ["#FCA2D9",2.7], ["#63110A",2.6], ["#E9B327",2.2], ["#6D644D",2.1], ["#6D8D12",2.0], ["#8F9F27",1.9], ["#C3573E",1.8], ["#CFD76E",1.6], ["#A0B058",1.6], ["#FCD0E9",1.6], ["#728F2D",1.4], ["#F958A1",1.4], ["#D1B694",1.0]],

    "predominant": {
      "google": [
        [
          "yellow",
          52.9
        ],
        [
          "pink",
          13.5
        ],
        [
          "red",
          12.0
        ],
        [
          "black",
          10.1
        ],
        [
          "green",
          6.3
        ]
      ]
    },
    
    "versions": [
        {
            "version_id": "d214063097a43d1d1293db61a397f60f",
            "version": "1312461204",
            "format": "jpg",
            "size": 109669,
            "time": "2021-08-04T12:33:24+00:00",
            "restorable": false
        }
    ]
}
```

---

### Search for resources
  
Search allows you fine control on filtering and retrieving information on all the resources (assets) in your product environment with the help of query expressions in a Lucene-like query language. 

> **See also**:
>
> For a detailed overview and a variety of search API examples, see the [Search API method](search_method) guide.

#### Syntax
`GET /resources/search`

```multi
|ruby 
result = Cloudinary::Search.execute

|php_2
$result = $cloudinary->searchApi()->execute();

|python
result = cloudinary.Search().expression().execute()

|nodejs
cloudinary.v2.search.execute().then(callback);
  
|java
result = cloudinary.search().execute();

|csharp
SearchResult result = cloudinary.Search().Execute();

|go
resp, err := cld.Admin.Search(ctx, search.Query{})

|cli
cld search
```

#### Optional parameters
All the parameters of the `search` method are optional. Including no parameters in the method call will return the 50 most recently created resources in descending order of creation time.

Parameter | Type | Description
---|---|---
expression | String | The (Lucene-like) string expression specifying the search query. If this parameter isn't provided then all resources are listed (up to `max_results`). To learn about building search queries, see the [search expressions](search_expressions) guide, and for details on using fields in your expressions, see the [Expression fields](#expression_fields) reference below.
sort_by  | String[] |  An array of string values representing a key value pair, where the key is the field to sort by and the value is the direction. Valid sort directions are `asc` or `desc`. If this parameter isn't provided then the results are sorted by descending creation date. You can specify more than one `sort_by` parameter; results will be sorted according to the order of the fields provided. **Note**: you can also sort the results by relevance if you set the key to `score` and give a sort direction as the value. Results are considered more relevant if the search term appears in multiple fields or the term is an exact match for an entire field.
max\_results | Integer | Maximum number of assets to return (maximum=`500`). **Default**: `10`. 
next\_cursor | String |  When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of the following request.
fields | String | A comma-separated list of fields to include in the response.**Notes**:- This parameter takes precedence over the `with_field` parameter, so if you want any additional asset attributes returned, make sure to also include them in this list  (e.g., `tags` or `context`).  - The following fields are always included in the response: `public_id`, `asset_id`, `asset_folder`, `created_at`, `status`, `type`, and `resource_type`.
with\_field  | String |  The name of an additional asset attribute to include for each asset in the response. You can specify more than one `with_field` parameter. Possible value: `context`, `tags`, and for [Tier 2](search_method#search_api_tiers) also `metadata`, `image_metadata`, and `image_analysis`. 
aggregate  | String [] |  (**[Tier 2](search_method#search_api_tiers) only**)  The type(s) of aggregation requested as a string or JSON object, depending on the type. When specified, the result includes aggregate counts of the returned assets, broken down by the specified field type (asset attribute). To get aggregate values for more than one attribute when using an SDK, pass multiple `aggregate` parameters; via REST API, specify multiple field types in the `aggregate` object. **Supported values**:  `format`, `type` ([delivery type](image_transformations#delivery_types)), `resource_type`: If you specify one of these attributes (pass the value as a string), the results include each distinct attribute value that also meets the rest of the search criteria, with the total count for each.`bytes`, `image_pixels` , `video_pixels`, `duration` (**Supported via REST API only.**): For these attributes you must pass an object where the first element is the `type`, and the second is an array of `ranges` objects. The `ranges` array contains one or more objects defining a `key` (any custom label for that range), and either a `from` value, a `to` value, or both. The results include the aggregate counts per defined range.For `image_pixels` , `video_pixels`, `duration`, the counts relate only to the image assets or only the video assets (as appropriate) in the search results.  **Examples:** [Aggregate request - simple](#aggregate_example_simple) &#124; [Aggregate request - ranges](#aggregate_example_ranges) &#124; [Aggregate response](#search_for_resources_sample_response).

> **INFO**:
>
> * Initialize a new Search query object for every distinct query executed. Avoid reusing the same instance of a Search query object, as that might lead to unexpected behavior, especially when using the `sort_by` parameter.

> * When iterating through the results using the `next_cursor` parameter, reuse the query without changing any of the other parameter values.

> * When making direct calls to the Cloudinary endpoint, make sure to pass any parameters using JSON (with `Content-Type: application/json`) as in the cURL examples below.

> * Cloudinary implements **eventual consistency**: Search results reflect any changes made to assets within a few seconds after the change.

#### Examples

1. Find assets containing 'shoe' in any field (attribute), include only the context metadata and tags fields in the details of each resource, and limit the returned results to 10 resources:

    ```multi
    |ruby
    result = Cloudinary::Search
      .expression('shoe')
      .fields('context')
      .fields('tags')
      .max_results(10)
      .execute

    |php_2
    $result = $cloudinary->searchApi()
      ->expression('shoe')
      ->fields('context')
      ->fields('tags')
      ->maxResults(10)
      ->execute();

    |python
    result = cloudinary.Search()\
      .expression("shoe")\
      .fields("context")\
      .fields("tags")\
      .max_results("10")\
      .execute()

    |nodejs
    cloudinary.v2.search
      .expression('shoe')
      .fields('context')
      .fields('tags')
      .max_results(10)
      .execute()
      .then(result=>console.log(result));

    |java
    result = cloudinary.search()
      .expression("shoe")
      .fields("context")
      .fields("tags")
      .maxResults(10)
      .execute();

    |csharp
    SearchResult result = cloudinary.Search()
      .Expression("shoe")
      .Fields("context")
      .Fields("tags")
      .MaxResults(10)
      .Execute();

    |go
    resp, err := cld.Admin.Search(ctx, search.Query{
		      Expression: "shoe",
		   	  Fields:  []string{"tags", "context"},
              MaxResults: 10})

    |curl
    curl \
      -H "Content-Type: application/json" \
      -d '{
            "expression": "shoe",
            "fields": ["context", "tags"],
            "max_results": 10
          }' \
      https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/search

    |cli
    cld search "shoe" -fi context -fi tags -n 10 
    ```

1. Find assets containing 'shirt' in any field but not 'blue' in the tags field, sort the results by `public_id` in descending order, and calculate an aggregation count based on the values of the format field:

    ```multi
    |ruby
    result = Cloudinary::Search
      .expression('shirt AND -tags:blue')
      .sort_by('public_id','desc')
      .aggregate('format')
      .execute

    |php_2
    $result = $cloudinary->searchApi()
      ->expression('shirt AND -tags:blue')
      ->sortBy('public_id','desc')
      ->aggregate('format')
      ->execute();

    |python
    result = cloudinary.Search()\
      .expression("shirt AND -tags:blue")\
      .sort_by("public_id","desc")\
      .aggregate("format")\
      .execute()

    |nodejs
    cloudinary.v2.search
      .expression('shirt AND -tags:blue')
      .sort_by('public_id','desc')
      .aggregate('format')
      .execute()
      .then(result=>console.log(result));

    |java
    result = cloudinary.search()
      .expression("shirt AND -tags:blue")
      .sortBy("public_id","desc")
      .aggregate("format")
      .execute();

    |csharp
    SearchResult result = cloudinary.Search()
      .Expression("shirt AND -tags:blue")
      .SortBy("public_id","desc")
      .Aggregate("format")
      .Execute();

    |go
    resp, err := cld.Admin.Search(ctx, search.Query{
          Expression: "shirt AND -tags:blue",
          SortBy:     []search.SortByField{{"public_id": "desc"}},
          Aggregate:  []string{"format"},
          MaxResults: 2})

    |curl
    curl \
      -H "Content-Type: application/json" \
      -d '{
            "expression": "shirt AND -tags:blue",
            "sort_by": [{"public_id": "desc"}],
            "aggregate": ["format"]
          }' \
      https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/search

    |cli
    cld search "shirt AND -tags:blue" -s public_id desc -a format
    ```

1. Find assets containing 'clothing' in any field and have an aspect ratio less than one (portrait orientation), sort the results by `public_id` in descending order, and calculate an aggregation count (supported for [Tier 2](search_method#search_api_tiers) only) based on custom-defined ranges for the `bytes` (with ranges) and `format` attributes.  (See a [sample response][search_response_link] for this example request.)

    ```multi
    |curl
    curl \
      -H "Content-Type: application/json" \
      -d '{
            "expression": "clothing AND aspect_ratio < 1",
            "sort_by": [{"public_id": "desc"}],
            "aggregate": [
             {
               "type": "bytes",
               "ranges": [
                 {
                   "key": "tiny",
                   "to": 500
                 },
                 {
                   "key": "medium",
                   "from": 501,
                   "to": 1999
                 },
                 {
                   "key": "big",
                   "from": 2000
                 }
               ]
             },
             "format"
           ]
         }' \
      https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/search

    ```

1. Find the next page of 500 results, using the 'next_cursor' from the previous call (b16b8bd80426df43a107f26b0348), of a search for images tagged with 'sale' and uploaded within the last day. Sort the results by `public_id` in descending order:

    ```multi
    |ruby
    result = Cloudinary::Search
      .expression('resource_type:image AND tags=sale AND uploaded_at>1d')
      .sort_by('public_id','desc')
      .max_results(500)
      .next_cursor('b16b8bd80426df43a107f26b0348')
      .execute

    |php_2
    $result = $cloudinary->searchApi()
      ->expression('resource_type:image AND tags=sale AND uploaded_at>1d')
      ->sortBy('public_id','desc')
      ->maxResults(500)
      ->nextCursor('b16b8bd80426df43a107f26b0348')
      ->execute();
 
    |python
    result = cloudinary.Search()\
      .expression("resource_type:image AND tags=sale AND uploaded_at>1d")\
      .sort_by("public_id","desc")\
      .max_results("500")\
      .next_cursor("b16b8bd80426df43a107f26b0348")\
      .execute()

    |nodejs
    cloudinary.v2.search
      .expression('resource_type:image AND tags=sale AND uploaded_at>1d')
      .sort_by('public_id','desc')
      .max_results(500)
      .next_cursor('b16b8bd80426df43a107f26b0348')
      .execute()
      .then(result=>console.log(result));
  
    |java
    result = cloudinary.search()
      .expression("resource_type:image AND tags=sale AND uploaded_at>1d")
      .sortBy("public_id","desc")
      .maxResults(500)
      .nextCursor("b16b8bd80426df43a107f26b0348")
      .execute();

    |csharp
    SearchResult result = cloudinary.Search()
      .Expression("resource_type:image AND tags=sale AND uploaded_at>1d")
      .SortBy("public_id","desc")
      .MaxResults(500)
      .NextCursor("b16b8bd80426df43a107f26b0348")
      .Execute();

    |go
    resp, err := cld.Admin.Search(ctx, search.Query{
        Expression: "resource_type:image AND tags=sale AND uploaded_at>1d",
        SortBy:     []search.SortByField{{"public_id": "desc"}},
        MaxResults: 500,
        NextCursor: 'b16b8bd80426df43a107f26b0348'})

    |curl
    curl \
      -H "Content-Type: application/json" \
      -d '{
            "expression": "resource_type:image AND tags=sale AND uploaded_at>1d",
            "sort_by": [{"public_id": "desc"}],
            "max_results":500,
            "next_cursor":"b16b8bd80426df43a107f26b0348"
          }' \
      https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/search

    |cli
    cld search "resource_type=image AND tags=sale AND uploaded_at>1d" -s public_id desc -n 500 next_cursor "b16b8bd80426df43a107f26b0348"
    ```

> **TIP**: For more examples, see the [expression examples](search_expressions#expression_examples) documentation.

#### Sample response
The following example shows the response for Search [example #3](#aggregate_example_ranges) above, which includes a request for aggregation by bytes (with ranges) and by format (supported for[Tier 2](search_method#search_api_tiers) only).

```json
{
    "total_count": 201,
    "time": 1021,
    "aggregations": {
        "bytes": {
            "tiny": 10,
            "medium": 32,
            "big": 159
        },
        "format": {
            "mp4": 93,
            "jpg": 60,
            "png": 30,
            "webp": 9,
            "mkv": 2,
            "ts": 2,
            "unknown": 2,
            "avif": 1,
            "mov": 1,
            "webm": 1
        }
    },
  "next_cursor": "b16b8bd80426df43a107f26b0348",
  "resources": [
  {
      "asset_id": "09169cf604b03521789d1b3b8cca53d1",
      "public_id": "blue_sweater",
      "asset_folder": "Clothing Sale",
      "filename": "blue_sweater",
      "display_name": "blue_sweater",
      "format": "jpg",
      "version": 1719316754,
      "resource_type": "image",
      "type": "upload",
      "created_at": "2024-06-25T11:59:14+00:00",
      "uploaded_at": "2024-06-25T11:59:14+00:00",
      "bytes": 71063,
      "backup_bytes": 71063,
      "width": 4800,
      "height": 6400,
      "aspect_ratio": 0.75,
      "pixels": 307200,
      "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719316754/blue_sweater.jpg",
      "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719316754/blue_sweater.jpg",
      "status": "active",
      "access_mode": "public",
      "access_control": null,
      "etag": "7242da7b353e7da2c3eb8c006165b385",
      "created_by": {
          "access_key": "614335564976464"
      },
      "uploaded_by": {
          "access_key": "614335564976464"
      }
  },
  {
      "asset_id": "8e8fa813b32fdfb78cc6a53bdb21da32",
      "public_id": "yellow_sun_top",
     …
     …
  }
  …
}
```

> **TIP**: The `status` field in the response tells you whether the asset is `active` and visible with working delivery URLs or `not_found` if it’s deleted but also [backed up](backups_and_version_management).

#### Expression Fields
You can use the following fields to limit your asset search criteria. The operators that you can use with a field depend on the field's value type. For details, see [Field types and supported operators](search_expressions#field_operators). 

You can use all fields for all resource types (image, video, raw) unless otherwise specified. Additionally, all string fields support both [exact and tokenized](search_expressions#string_operators_exact_or_tokenized_searches) search unless otherwise specified.

> **See also**:
>
> For a detailed overview and a variety of expression examples, see the [Search expressions](search_expressions) guide.
                                                                          
Field Name | Type | Examples | Details
---|---|---|---
Asset Management |||
`access_mode` | String (fixed list)  | access\_mode:authenticated| The authentication level currently set for the resource.Possible values: `public`, `authenticated`Case-sensitive **Note**: The `access_mode` parameter is no longer supported. To restrict access to assets, you can use the `access_control` parameter.
`asset_id` | String | asset\_id=abcd10ef1234ab1c678def9a0c123| The immutable ID of the asset. An asset's `asset_id` is returned when assets are uploaded as well as when they're retrieved, such as when using the [resources](admin_api#resources) method. Not supported for product environments using the legacy fixed folder mode.
`asset_folder` | String | asset\_folder=test/sample // exact folder, no subfoldersasset\_folder:sample/* // prefix, all contents of 'sample' under rootasset\_folder:"my folder with spaces" // folder name containing spaces| You can search for an exact folder path, or you can search for a folder prefix, which returns all contents of the specified folder and all its subfolders. Case-sensitive.Not supported for product environments using the legacy fixed folder mode.
`context` | String  | context.productType:shoecontext.productType=shoecontext."key with spaces":myValuecontext:keyname *//check for key existence*| You can search for a specific key-value pair, or for all resources with a particular key regardless of the value, or with a particular value regardless of the key.- To search for the value of a key, specify the key value of the context using the dot (.) notation, and the value using a colon (:).- To check for the existence of a key name, specify the keyname you are searching for after an equal sign (=).- Key names are exact match only and are case-sensitive.- Values can be tokenized or exact match.- Exact match (=) searches are case-sensitive. - Tokenized searches (:) are case insensitive. 
`created_at` | Date |created\_at:["2022-11-12T12:00:00Z" TO 1w]created\_at:[4w TO 1w]created\_at>10dcreated\_atcreated\_atcreated\_atlast\_updated.context\_updated\_at>"2022-10-22T12:00:00Z" |  You can search within any of the `last_updated` fields: `access_control_updated_at`, `context_updated_at`, `metadata_updated_at`, `public_id_updated_at`, `tags_updated_at`, or `updated_at`.**Note**: If you include the time, the entire date and time need to be enclosed in quotation marks.
`display_name` | String | display\_name="small white dog"display\_name:"small white"**public\_id**:dog* | The user-friendly display name of the asset. Not supported for product environments using the legacy fixed folder mode.
`folder` | String | folder=test/sample // exact folder, no subfoldersfolder:sample/* // prefix, all contents of 'sample' under rootfolder:"my folder with spaces" // folder name containing spaces| You can search for an exact folder path, or you can search for a folder prefix, which returns all contents of the specified folder and all its subfolders. Case-sensitive. Supported only for product environments using the legacy fixed folder mode.
`metadata` | String | metadata.quantity\_idmetadata.name\_id:john //stringmetadata.city\_id=paris\_id //enummetadata.exp_date>2021-01-01 //datemetadata.color_id:red_id //set | Specify the external\_id of any structured metadata field using the dot (.) notation, where the external ID is compared with a specified value according to the field's defined type (use the datasource external\_id instead of a value for enum and set types). See [metadata fields](admin_api#metadata_fields) for details.
`moderation_kind` | String  | moderation_kind=perception_point| The moderation applied to the asset.For assets marked for multiple moderations:- *During moderation*: The moderation currently being applied to the asset.- *If the asset was rejected*: The moderation that rejected the asset.- *If the asset was approved*: The last moderation that was applied.Possible values: `manual`, `perception_point`, `webpurify`, `aws_rek`, `duplicate`, `aws_rek_video`, `google_video_moderation` Case-sensitive.
`moderation_status` | String  | moderation_status=approved| The current moderation status.Possible values: `pending`, `approved`, `rejected`Case-sensitive.
`public_id` | String | public\_id=test/sample/dogpublic\_id:test/sample/dogpublic\_id:test/sample/dog\*| The full public ID, including slashes when relevant. You can search for an exact public\_id, or you can search for a public\_id prefix using the * operator. Case-sensitive 
`tags` | String | tags:siamese //tokenized searchtags=siamese //exact search-tags=siamese //doesn't have the tagtags="siamese cats" //tag includes a space-tags //has no tags at all| Exact match (=) searches are case-sensitive. Tokenized searches (:) are case insensitive.
`type` | String (fixed list)  | type:private| The asset type. Possible values: `upload`, `private`, `authenticated`, `fetch`, `facebook`, `twitter`, etc.Exact match only. Case-sensitive.
`uploaded_at` | Date | uploaded_atMedia Properties |||
`aspect_ratio`|Number or String| aspect\_ratio="16:9"aspect\_ratioExact match only. Case-sensitive. 
`bytes` | Number | bytes:[1000 TO 5000000]1bytes>100000| The file's size. You can append a `b` for bytes (default), a `kb` for kilobytes, a `mb` for megabytes, and a `gb` for gigabytes. 
`duration` |Number or String| duration:[30s TO 2m]1duration>5durationdurationVideo resources only. 
`filename` | String | filename="hound-dog"filename:(dog cat)filename:hound*  | Refers to the last element of the public ID without a format extension. You can search for an exact or tokenized filename, or you can search for a filename prefix using the * operator. Exact match (=) searches are case-sensitive. Tokenized searches (:) are case insensitive. 
`format` | String | format=(jpg OR mp4)|Exact match only. Case-insensitive. 
`height` | Number | height400000 | Number of total pixels (width x height). You can append a `p` for pixels (default) or an `m` for megapixels. Not relevant for raw files. 
`resource_type` |String (fixed list) | resource\_type:imageresource\_type:video| Possible values: `image`, `video`, `raw` Exact match only. Case-sensitive. 
`width` | Number | width>100width=1028| Not relevant for raw files. 
System |||
`backup_bytes`| Number |backup_bytes>0 // all resources that are backed up.| If the resource is backed up, indicates the space taken in the backup system by all backed up versions. You can append a `b` for bytes (default), a `kb` for kilobytes, or a `mb` for megabytes.
`status` | String (fixed list)  | status=deletedstatus=deleted OR active | Possible values: `active`, `deleted`**Notes**:- Resource data is stored in the database with status deleted only if the resource has a [backup](backups_and_version_management).- By default, when you conduct a search, the response includes only resources with active status. If you want the response to include resources with a deleted status, you must use this field to specify it.Exact match only. Case-sensitive.
Asset analysis and embedded metadata ([Tier 2](search_method#search_api_tiers)) ||| 
`accessibility_analysis.colorblind_accessibility_score` | Number | accessibility\_analysis.colorblind\_accessibility\_score>0.8 | A score between 0 and 1 indicating the level of [accessibility](accessibility_analysis) of the image to color blind people. Available only for images for which `accessibility_analysis` was set to `true` during upload (in the upload request or upload preset). **Note**: The `accessibility_analysis.colorblind_accessibility_score` field is returned in searches including a `with_field` parameter specifying `accessibility_analysis`. 
`colors` | String | colors:blue //images that contain bluecolors.blue>=2  //images that are at least 2% blue |To search for images that contain a specified color (as one of the detected predominant colors), use the colon notation. Supported colors: green, blue, lightblue, black, white, red, gray, lime, yellow, olive, cyan, teal, purple, orange, pink, and brownTo search for images that have a specified % of the specified color, use the dot (.) notation. Image resources only. **Note**: The `colors` field is returned in searches including a `with_field` parameter specifying `image_analysis`.
`etag` | String | etag=d8ee49a7e9fb633c91cd4d4b2b| Exact match only. Case-sensitive. **Note**: The `etag` field is returned in searches including a `with_field` parameter specifying `image_analysis`.   
`face_count` | Number | face_count>=1| Image resources only. **Note**: The `face_count` field is returned in searches including a `with_field` parameter specifying `image_analysis`.   
`grayscale` | Boolean | grayscale:true| Image resources only. **Note**: The `grayscale` field is returned in searches including a `with_field` parameter specifying `image_analysis`.  
`illustration_score` | Number | illustration_score>0.5| The likelihood that the image is an illustration (as opposed to a photo). Values between 0 (photo) and 1 (illustration).Image resources only. **Note**: The `illustration_score` field is returned in searches including a `with_field` parameter specifying `image_analysis`.    
`image_metadata`| String  | image_metadata.license=a1s3d5f7a9s2d4f | Accesses the specified type of embedded metadata from the image, such as from the Exif data or XMP.Specify any embedded metadata element using the dot (.) notation. Embedded metadata element values are case-sensitive. Specify their names exactly as stored inside the actual image metadata.Image resources only.
`location`| String | location:"40.73,-74.1&#124;41.73,-74.1&#124;41.73,-75.1&#124;42.73,-75.1&#124;41.73,-74.1" // within a bounding polygonlocation:"40.73,-74.1&#124;40.73,-74.1" // within a bounding boxlocation:"40.73,-74.1 5km" // within distance of a point |  Matches the GPS location stored with the image metadata to within a specified bounding polygon, bounding box, or within distance from a specified point (distance can be specified in: `mi` (miles), `yd` (yards), `m` (meters), or `km` (kilometers)).
`quality_analysis.color_score` | Number | quality\_analysis.color\_score>0.6 | A component of [extended quality analysis](image_quality_analysis#extended_quality_analysis), the `quality_analysis.color_score` takes into account factors such as exposure, white balance, contrast and saturation. Downscaling makes no difference to the perceived color quality. Available only for images for which `quality_analysis` was set to `true` during upload (in the upload request or upload preset). **Note**: The `quality_analysis.color_score` field is returned in searches including a `with_field` parameter specifying `quality_analysis`.
`quality_analysis.pixel_score` | Number | quality\_analysis.pixel\_score>0.6 | A component of [extended quality analysis](image_quality_analysis#extended_quality_analysis), the `quality_analysis.pixel_score` is a measure of how the image looks in terms of compression artifacts (blockiness, ringing etc.) and in terms of capture quality (focus and sensor noise). Downscaling can improve the perceived visual quality of an image with a poor pixel score. Available only for images for which `quality_analysis` was set to `true` during upload (in the upload request or upload preset). **Note**: The `quality_analysis.pixel_score` field is returned in searches including a `with_field` parameter specifying `quality_analysis`. 
`quality_score` | Number | quality\_score>0.7 | The overall weighted quality score. Available only for images for which `quality_analysis` was set to `true` during upload (in the upload request or upload preset) and only for paid accounts taking part in the [extended quality analysis](image_quality_analysis#extended_quality_analysis) Beta trial. **Note**: The `quality_score` field is returned in searches including a `with_field` parameter specifying `image_analysis`. 
`taken_at` | Date |taken\_at:[2017-10-10T12:00:00Z TO 1w]taken\_at:[1w TO 4w]taken\_at>10dtaken\_attaken\_attaken\_atImage resources only. **Note**: The `transparent` field is returned in searches including a `with_field` parameter specifying `image_analysis`.

> **NOTES**: :title=Footnote

1. When specifying a range, the results include all matches from and including the minimum number specified, and up to but not including the maximum number specified.

---

### Visual Search for resources

> **NOTE**:
>
> **Visual Search** is available only to Enterprise customers. For more information, contact [Customer Support](https://support.cloudinary.com/hc/en-us/requests/new) or your Cloudinary Customer Success Manager. Additional costs may apply for accounts with over 10 million images, depending on your account setup.Cloudinary’s AI-powered **Visual and Natural Language Search** (referred to as **Visual Search**) lets you find images by describing them in plain language or by using another image as a reference. It understands context and visual meaning, whether from text or image input, to deliver more intuitive and accurate results than traditional keyword or tag-based search.
> **TIP**:
>
> This feature is also available to **Assets Enterprise** plans for Media Library searches. For details, see [Assets visual search](dam_visual_search).

You can run a visual search by providing one of the following sources:

* The URL of an image.
* The `asset_id` of an image in your account.
* A textual description, e,g,. "jackets".

{info}
Only images that have already been indexed for visual search are included in the results. You can index an image by including the `visual_search = true` parameter when [uploading](image_upload_api_reference#upload) or [updating](#update_details_of_an_existing_resource) the asset. 
{/info}

#### Syntax
`GET /resources/visual_search`

```multi        
|ruby
Cloudinary::Api.visual_search(options = {})

|php_2
$api->visualSearch($options = []);

|python
cloudinary.api.visual_search(**options)

|nodejs
cloudinary.v2.api.visual_search(options).then(callback);

|java
cloudinary.api().visualSearch(Map options);

|csharp
cloudinary.VisualSearch(VisualSearchParams params);

|go
resp, err := cld.Admin.VisualSearch(ctx, admin.VisualSearchParams{})

|cli
cld admin visual_search 
```

#### Required parameters
ONE of the following parameters is required (specified in the `options` object if using an SDK):

Parameter | Type | Description
---|---|---
image\_url | String | The URL of an image.
image\_asset_id | String | The `asset_id` of an image in your account.
text | String | A textual description, e.g., “shirts”

#### Examples
Do a visual search for 'footwear':

```multi        
|ruby
Cloudinary::Api.visual_search(text: "footwear")

|php_2
$api->visualSearch("text" => "footwear");

|python
cloudinary.api.visual_search(text = "footwear")

|nodejs
cloudinary.v2.api.visual_search({text: "footwear"}).then(callback);

|java
cloudinary.api().visualSearch(ObjectUtils.asMap(
  "text", "footwear"
));

|csharp
var info = cloudinary.VisualSearch(new VisualSearchParams{
  Text = "footwear"
});

|go
resp, err := cld.Admin.VisualSearch(ctx, admin.VisualSearchParams{
	Text: "footwear"
})

|cli
cld admin visual_search text="footwear"

|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/visual_search?text="footwear"
```

#### Sample response
The response returns the assets in order of relevance, from most to least similar:

```json
{
  "next_cursor": "a36b8bd80426df43a107f26b0348",
  "resources": [
  {
    "asset_id": "5f9d30acd36ac3c4f48a82241a37a299",
    "public_id": "shoes",
    "format": "jpg",
    "version": 1312461204,
    "resource_type": "image",
    "type": "upload",
    "created_at": "2023-04-03T09:56:49+00:00",
    "bytes": 3381,
    "width": 241,
    "height": 51,
    "asset_folder": "footwear",
    "display_name": "shoes",
    "tags": [],
    "url": "http://res.cloudinary.com/cld-docs/image/upload/v1312461204/shoes.jpg",
    "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1312461204/shoes.jpg",
    "access_mode": "public",

  },
  {
    "asset_id": "191ad30acd36acf48a82241a137a299a",
    "public_id": "sneakers",
     …
     …
  }
  …
}
```

---

### Update details of an existing resource by asset ID

Update one or more attributes of a specified resource (asset) by its asset ID. This enables you to update details of an asset by its unique and immutable identifier, regardless of public ID, display name, asset folder, resource type or deliver type.

Note that you can also update many attributes of an existing asset using the [explicit](image_upload_api_reference#explicit_method") method, which isn't rate-limited.

#### Syntax
`PUT /resources/:asset_id`

#### Required parameters
Parameter | Type | Description
---|---|---
asset\_id | String | The immutable, unique identifier of the asset. 

#### Optional parameters
Parameter | Type | Description
---|---|---              
display\_name | String | **Not relevant for product environments using the legacy fixed folder mode.** A user-friendly name for the asset.  Display names can have spaces and special characters, but can't include forward slashes (/). This name can be completely different than the asset's `public id` and its value doesn't impact the delivery URL in any way. The display name is shown in user interface pages such as the Console Media Library, Cloudinary collections, and Cloudinary basic portals.   Though not a best practice, it's possible for the same display name to be used for different assets, even in the same asset folder.
unique\_display\_name | Boolean |  **Not relevant for product environments using the legacy fixed folder mode.** If true, and you've passed a `display_name` that already exists within the same `asset_folder` or you specify a new `asset_folder` value (to move the asset) and the same display name already exists in the target asset folder, a random character suffix will be appended to the display name of this asset to ensure it's uniqueness within the asset folder.**Default**: `false`
asset\_folder | String |  **Not relevant for product environments using the legacy fixed folder mode.** The folder where the asset is placed within the Cloudinary repository. Setting this value in an `update` method moves the asset to the specified asset folder, but does not impact the asset’s public ID path.
tags | String | A comma-separated list of tag names to assign to the uploaded asset for later group reference. 
context | String | A map (using the SDKs) or pipe-separated list (for REST API calls) of key-value pairs of contextual metadata to attach to an uploaded asset. The contextual metadata values of uploaded files can be retrieved using the Admin API. **For example**: `alt=My image|caption=Profile Photo`.
metadata | String | A map (supported for Java SDK only) or pipe-separated list (for REST API calls) of custom metadata fields (by `external\_id`) and the values to assign to each of them. For example: <code>in_stock_id=50&#124;color_id=[\"green\",\"red\"]. **SDKs**: Supports maps.**Notes**:The `=`, `"` and <code>&#124; characters can be supported as values when escaped with a prepended backslash (`\`).For a multi-select field, you can set a maximum of 3000 different metadata values on an asset.
clear\_invalid | Boolean | (Relevant for cascading metadata, and assets with multiple metadata fields) When updating the value of a metadata field results in another metadata field’s value becoming invalid, that invalid value is cleared instead of resulting in an error. **Default**: `false`.
face\_coordinates | String | Relevant for images only. A list of coordinates of faces contained in an uploaded image. The specified coordinates are used for cropping or adding overlays to uploaded images using the `face` or `faces` gravity mode. The specified coordinates override the automatically detected faces. Each face is specified by the X & Y coordinates of the top left corner and the width & height of the face. The coordinates are comma separated while faces are concatenated with a pipe (<code>&#124;). **For example**: <code>10,20,150,130&#124;213,345,82,61.
custom\_coordinates | String | Relevant for images only. The coordinates of one or more regions contained in an uploaded image that can be  subsequently used for cropping or adding layers using the `custom` gravity mode. Specify regions by the X & Y coordinates of the top left corner and the width & height of the region, as a comma-separated list. For example: `85,120,220,310`. To specify more than one region, separate them with a  pipe (<code>&#124;), for example: <code>85,120,220,310&#124;150,180,100,300. **SDKs**: Supports arrays. For example: `[85, 120, 220, 310]`.[Learn more](custom_focus_areas#custom_coordinates).
regions | JSON | Relevant for images only. The coordinates of one or more named regions contained in an uploaded image that can be subsequently used for cropping using the [region](transformation_reference#g_region) gravity mode. Each region is specified by a name (alphanumeric characters and hyphens permitted) and an array of at least two X,Y coordinate pairs, e.g., `{ "name1": [[1, 2], [3, 4]], "name2": [[5,6], [7,8], [9,10]] }`. If two pairs are specified, these refer to the top left and bottom right coordinates of a rectangle. Otherwise, if more pairs are specified, they refer to the corners of a custom region.[Learn more](custom_focus_areas#custom_regions).
quality\_override | Integer | Sets a quality value for this asset that will override any automatic quality transformations (q_auto) for this specific asset.
moderation_status | String | Manually set image moderation status or override previously automatically moderated images by approving or rejecting. **Possible values**: `approved`, `rejected`.
auto\_tagging | Decimal | Automatically assigns tags to an asset according to detected objects or categories with a confidence score higher than the specified value. Use together with the `detection` parameter for: [Cloudinary AI Content Analysis](cloudinary_ai_content_analysis_addon#automatic_image_tagging)[Amazon Rekognition Celebrity Detection](aws_rekognition_celebrity_and_face_detection_addon#automatically_adding_tags_to_images)Use together with the `categorization` parameter for: [Google Automatic Video Tagging](google_automatic_video_tagging_addon#adding_resource_tags_to_videos)[Google Auto Tagging](google_auto_tagging_addon#adding_resource_tags_to_images)[Imagga Auto Tagging](imagga_auto_tagging_addon#adding_resource_tags_to_images)[Amazon Rekognition Auto Tagging](aws_rekognition_auto_tagging_addon#automatically_adding_tags_to_images) **Range**: 0.0 to 1.0
detection | String | Invokes the relevant add-on to return a list of detected content. Set to:\_\[\<version\>\] (e.g. `coco_v2`) to return a list of detected content using the [Cloudinary AI Content Analysis](cloudinary_ai_content_analysis_addon#automatic_image_tagging) add-on. Can be used together with the `auto_tagging` parameter to apply tags automatically.`captioning` to analyze an image and [suggest a caption](cloudinary_ai_content_analysis_addon#ai_based_image_captioning) based on the image's contents.`iqa` to [analyze the quality](cloudinary_ai_content_analysis_addon#image_quality_analysis) of an image.`watermark-detection` to [detect watermarks](cloudinary_ai_content_analysis_addon#watermark_detection) in an image.`adv_face` to return a list of facial attributes using the [Advanced Facial Attribute Detection](advanced_facial_attributes_detection_addon) add-on.`aws_rek_face` to return a list of detected celebrities and facial attributes using the [Amazon Rekognition Celebrity Detection](aws_rekognition_celebrity_and_face_detection_addon) add-on. Can be used together with the `auto_tagging` parameter to apply tags automatically. Relevant for images only.
ocr | String |  Set to `adv_ocr` to extract all text elements in an image as well as the bounding box coordinates of each detected element using the [OCR text detection and extraction add-on](ocr_text_detection_and_extraction_addon).Relevant for images only.
raw\_convert | String | Generates a related file based on the uploaded file.Set to `aspose` to automatically create a PDF or other image format from a `raw` Office document using the [Aspose Document Conversion add-on](aspose_document_conversion_addon). (Asynchronous)Set to `google_speech` to instruct the [Google AI Video Transcription](google_ai_video_transcription_addon) add-on to generate an automatic transcript `raw` file from an uploaded video. (Asynchronous)Set to `extract_text` to extract all the text from a PDF file and store it in a `raw` JSON file with a public ID in the format: **[pdf\_public\_id].extract_text.json**. The full URL of the generated JSON file is included in the API response. (Synchronous) See also: [Converting raw files](upload_parameters#uploading_non_media_files_as_raw_files).
categorization | String | A comma-separated list of the categorization add-ons to run on the asset. Set to `google_tagging`, `google_video_tagging`, `imagga_tagging` and/or `aws_rek_tagging` to automatically classify the scenes of the uploaded asset. Can be used together with the `auto_tagging` parameter to apply tags automatically. See the [Google Automatic Video Tagging](google_automatic_video_tagging_addon), [Google Auto Tagging](google_auto_tagging_addon), [Imagga Auto Tagging](imagga_auto_tagging_addon) and [Amazon Rekognition Auto Tagging](aws_rekognition_auto_tagging_addon) add-ons for more details.
visual\_search | Boolean | Whether to index the image for use with [visual search](#visual_search_for_resources). **Default**: false. Relevant for images only. 
background\_removal | String | Automatically remove the background of an image. Set to `cloudinary_ai` to use Cloudinary's built-in deep-learning based functionality. **Note**: It's recommended to store the original and use  [background removal on the fly](background_removal). Set to `pixelz` to use the human-powered [Pixelz Remove-The-Background Editing add-on](remove_the_background_image_editing_addon) service.Relevant for images only.
access\_control | access_types[] | An array of `access_types` for the asset. The asset is accessible as long as one of the access types is valid. Possible values for each access type:`token` - requires either [Token-based access](control_access_to_media#token_based_access_premium_feature) or [Cookie-based access](control_access_to_media#cookie_based_access_premium_feature) for accessing the resource. **For example**: `access_type: 'token'``anonymous` - allows public access to the resource. The anonymous access type should also include `start` and `end` dates (in ISO 8601 format) defining when the resource is publicly available. **For example**: `access_type: 'anonymous', start: '2017-12-15T12:00Z', end: '2018-01-20T12:00Z'`
  
#### Examples
Update tags and moderation status of an image:

```multi
|curl
curl \
 -d "tags=important&moderation_status=approved" \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/a52hk78ltowyvnzl520
```

---

### Update details of an existing resource by public ID
Update one or more attributes of a specified resource (asset) identified by its public ID. Note that you can also update many attributes of an existing asset using the [explicit](image_upload_api_reference#explicit_method") method, which is not rate limited.

#### Syntax
`POST /resources/:resource_type/:type/:public_id`

```multi        
|ruby
Cloudinary::Api.update(public_id, options = {})

|php_2
$api->update($public_id, $options = []);

|python
cloudinary.api.update(public_id, **options)

|nodejs
cloudinary.v2.api.update(public_id, options).then(callback);

|java
cloudinary.api().update(String public_id, Map options);

|csharp
cloudinary.UpdateResource(UpdateParams params);

|go
resp, err := cld.Admin.UpdateAsset(ctx, admin.UpdateAssetParams{})

|cli
cld admin update (public_id)
```

#### Required parameters
Parameter | Type | Description
---|---|---
public\_id |String | The public ID of the asset to update.

#### Optional parameters
Parameter | Type | Description
---|---|---
resource\_type | String | The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.        
type | String |  The delivery type, relevant as a parameter only when using the SDKs (the `type` is included in the endpoint URL when using the REST API). **Possible values**: `upload`, `private`, `authenticated`, `facebook`, `twitter`, `gravatar`, `youtube`, `hulu`, `vimeo`, `animoto`, `worldstarhiphop`, `dailymotion`. **Default**: all.                  
display\_name | String | **Not relevant for product environments using the legacy fixed folder mode.** A user-friendly name for the asset.  Display names can have spaces and special characters, but can't include forward slashes (/). This name can be completely different than the asset's `public id` and its value doesn't impact the delivery URL in any way. The display name is shown in user interface pages such as the Console Media Library, Cloudinary collections, and Cloudinary basic portals.   Though not a best practice, it's possible for the same display name to be used for different assets, even in the same asset folder.
unique\_display\_name | Boolean |  **Not relevant for product environments using the legacy fixed folder mode.** If true, and you've passed a `display_name` that already exists within the same `asset_folder` or you specify a new `asset_folder` value (to move the asset) and the same display name already exists in the target asset folder, a random character suffix is appended to the display name of this asset to ensure it's uniqueness within the asset folder.**Default**: `false`
asset\_folder | String |  **Not relevant for product environments using the legacy fixed folder mode.** The folder where the asset is placed within the Cloudinary repository. Setting this value in an `update` method moves the asset to the specified asset folder, but doesn't impact the asset’s public ID path.
tags | String | A comma-separated list of tag names to assign to the uploaded asset for later group reference. 
context | String | A map (using the SDKs) or pipe-separated list (for REST API calls) of key-value pairs of contextual metadata to attach to an uploaded asset. The contextual metadata values of uploaded files can be retrieved using the Admin API. **For example**: `alt=My image|caption=Profile Photo`.
metadata | String | A map (supported for Java SDK only) or pipe-separated list (for REST API calls) of custom metadata fields (by `external\_id`) and the values to assign to each of them. For example: <code>in_stock_id=50&#124;color_id=[\"green\",\"red\"]. **SDKs**: Supports maps.**Notes**:The `=`, `"` and <code>&#124; characters can be supported as values when escaped with a prepended backslash (`\`).For a multi-select field, you can set a maximum of 3000 different metadata values on an asset.
clear\_invalid | Boolean | (Relevant for cascading metadata, and assets with multiple metadata fields) When updating the value of a metadata field results in another metadata field’s value becoming invalid, that invalid value is cleared instead of resulting in an error. **Default**: `false`.
face\_coordinates | String | Relevant for images only. A list of coordinates of faces contained in an uploaded image. The specified coordinates are used for cropping or adding overlays to uploaded images using the `face` or `faces` gravity mode. The specified coordinates override the automatically detected faces. Each face is specified by the X & Y coordinates of the top left corner and the width & height of the face. The coordinates are comma separated while faces are concatenated with a pipe (<code>&#124;). **For example**: <code>10,20,150,130&#124;213,345,82,61.
custom\_coordinates | String | Relevant for images only. The coordinates of one or more regions contained in an uploaded image that can be  subsequently used for cropping or adding layers using the `custom` gravity mode. Specify regions by the X & Y coordinates of the top left corner and the width & height of the region, as a comma-separated list. For example: `85,120,220,310`. To specify more than one region, separate them with a  pipe (<code>&#124;), for example: <code>85,120,220,310&#124;150,180,100,300. **SDKs**: Supports arrays. For example: `[85, 120, 220, 310]`.[Learn more](custom_focus_areas#custom_coordinates).
regions | JSON | Relevant for images only. The coordinates of one or more named regions contained in an uploaded image that can be subsequently used for cropping using the [region](transformation_reference#g_region) gravity mode. Each region is specified by a name (alphanumeric characters and hyphens permitted) and an array of at least two X,Y coordinate pairs, e.g., `{ "name1": [[1, 2], [3, 4]], "name2": [[5,6], [7,8], [9,10]] }`. If two pairs are specified, these refer to the top left and bottom right coordinates of a rectangle. Otherwise, if more pairs are specified, they refer to the corners of a custom region.[Learn more](custom_focus_areas#custom_regions).
quality\_override | Integer | Sets a quality value for this asset that will override any automatic quality transformations (q_auto) for this specific asset.
moderation_status | String | Manually set image moderation status or override previously automatically moderated images by approving or rejecting. **Possible values**: `approved`, `rejected`.
auto\_tagging | Decimal | Automatically assigns tags to an asset according to detected objects or categories with a confidence score higher than the specified value. Use together with the `detection` parameter for: [Cloudinary AI Content Analysis](cloudinary_ai_content_analysis_addon#automatic_image_tagging)[Amazon Rekognition Celebrity Detection](aws_rekognition_celebrity_and_face_detection_addon#automatically_adding_tags_to_images)Use together with the `categorization` parameter for: [Google Automatic Video Tagging](google_automatic_video_tagging_addon#adding_resource_tags_to_videos)[Google Auto Tagging](google_auto_tagging_addon#adding_resource_tags_to_images)[Imagga Auto Tagging](imagga_auto_tagging_addon#adding_resource_tags_to_images)[Amazon Rekognition Auto Tagging](aws_rekognition_auto_tagging_addon#automatically_adding_tags_to_images) **Range**: 0.0 to 1.0
detection | String | Invokes the relevant add-on to return a list of detected content. Set to:\_\[\<version\>\] (e.g. `coco_v2`) to return a list of detected content using the [Cloudinary AI Content Analysis](cloudinary_ai_content_analysis_addon#automatic_image_tagging) add-on. Can be used together with the `auto_tagging` parameter to apply tags automatically.`captioning` to analyze an image and [suggest a caption](cloudinary_ai_content_analysis_addon#ai_based_image_captioning) based on the image's contents.`iqa` to [analyze the quality](cloudinary_ai_content_analysis_addon#image_quality_analysis) of an image.`watermark-detection` to [detect watermarks](cloudinary_ai_content_analysis_addon#watermark_detection) in an image.`adv_face` to return a list of facial attributes using the [Advanced Facial Attribute Detection](advanced_facial_attributes_detection_addon) add-on.`aws_rek_face` to return a list of detected celebrities and facial attributes using the [Amazon Rekognition Celebrity Detection](aws_rekognition_celebrity_and_face_detection_addon) add-on. Can be used together with the `auto_tagging` parameter to apply tags automatically. Relevant for images only.
ocr | String |  Set to `adv_ocr` to extract all text elements in an image as well as the bounding box coordinates of each detected element using the [OCR text detection and extraction add-on](ocr_text_detection_and_extraction_addon).Relevant for images only.
raw\_convert | String | Generates a related file based on the uploaded file.Set to `aspose` to automatically create a PDF or other image format from a `raw` Office document using the [Aspose Document Conversion add-on](aspose_document_conversion_addon). (Asynchronous)Set to `google_speech` to instruct the [Google AI Video Transcription](google_ai_video_transcription_addon) add-on to generate an automatic transcript `raw` file from an uploaded video. (Asynchronous)Set to `extract_text` to extract all the text from a PDF file and store it in a `raw` JSON file with a public ID in the format: **[pdf\_public\_id].extract_text.json**. The full URL of the generated JSON file is included in the API response. (Synchronous)  See also: [Converting raw files](upload_parameters#uploading_non_media_files_as_raw_files).
categorization | String | A comma-separated list of the categorization add-ons to run on the asset. Set to `google_tagging`, `google_video_tagging`, `imagga_tagging` and/or `aws_rek_tagging` to automatically classify the scenes of the uploaded asset. Can be used together with the `auto_tagging` parameter to apply tags automatically. See the [Google Automatic Video Tagging](google_automatic_video_tagging_addon), [Google Auto Tagging](google_auto_tagging_addon), [Imagga Auto Tagging](imagga_auto_tagging_addon) and [Amazon Rekognition Auto Tagging](aws_rekognition_auto_tagging_addon) add-ons for more details.
visual\_search | Boolean | Whether to index the image for use with [visual search](#visual_search_for_resources). **Default**: false. Relevant for images only. 
background\_removal | String | Automatically remove the background of an image. Set to `cloudinary_ai` to use Cloudinary's built-in deep-learning based functionality. **Note**: It's recommended to store the original and use [background removal on the fly](background_removal). Set to `pixelz` to use the human-powered [Pixelz Remove-The-Background Editing add-on](remove_the_background_image_editing_addon) service.Relevant for images only.	
access\_control | access_types[] | An array of `access_types` for the asset. The asset is accessible as long as one of the access types is valid. Possible values for each access type:`token` - requires either [Token-based access](control_access_to_media#token_based_access_premium_feature) or [Cookie-based access](control_access_to_media#cookie_based_access_premium_feature) for accessing the resource. **For example**: `access_type: 'token'``anonymous` - allows public access to the resource. The anonymous access type should also include `start` and `end` dates (in ISO 8601 format) defining when the resource is publicly available. **For example**: `access_type: 'anonymous', start: '2017-12-15T12:00Z', end: '2018-01-20T12:00Z'`
  
#### Examples
Update tags and moderation status of an uploaded image:

```multi
|curl
curl \
 -d "tags=important&moderation_status=approved" \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload/image1
        
|ruby
result = Cloudinary::Api
.update("image1",
  tags: "important",
  moderation_status: "approved")

|php_2
$result = $api
->update("image1", [
    "tags" => "important", 
    "moderation_status" => "approved"]);

|python
result = cloudinary.api\
.update("image1",
  tags = "important",
  moderation_status = "approved")

|nodejs
cloudinary.v2.api
.update("image1", 
  { tags: "important", 
    moderation_status: "approved"})
.then(result=>console.log(result)); 

|java
result = cloudinary.api()
.update("image1",
  ObjectUtils.asMap(
    "tags", "important",
    "moderation_status", "approved"));

|csharp
var updateParams = new UpdateParams("image1"){
  Tags = "important",
  ModerationStatus = "approved"};
var updateResult = cloudinary.UpdateResource(updateParams); 

|go
	resp, err := cld.Admin.UpdateAsset(ctx, admin.UpdateAssetParams{
		PublicID:         "image1",
		Tags:     		   []string{"important"},
		ModerationStatus: "approved"})

|cli
cld admin update image1 tags="important" moderation_status="approved"
```

---

### Restore resources by asset ID

Restores one or more resources (assets) from [backup](backups_and_version_management) by their asset IDs. This enables you to restore assets by their unique and immutable identifier, regardless of public ID, display name, asset folder, resource type or deliver type.

#### Syntax
`POST /resources/restore`

```multi
|nodejs
cloudinary.v2.api.restore_by_asset_ids(asset_ids, options).then(callback);
```

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
asset\_ids | String[] | The unique and immutable asset IDs of (deleted or existing) backed up assets to restore (array of up to 100 asset IDs). By default, the latest backed up version of the asset is restored. If the `versions` parameter is specified, the corresponding version of each asset ID is restored.

#### Optional parameters
Parameter | Type| Description
 --- | --- | ---
versions | String[] | The version of each of the assets to restore.  Specify the `version_id` for each asset ID in the same order as the `asset_ids` parameter (i.e., the first version ID corresponds to the first asset ID, the second version ID to the second asset ID, and so on). Use the [resource](#get_details_of_a_single_resource_by_asset_id) method to list details of backed up versions of an asset.
notification_url | String | An HTTP or HTTPS URL to [notify](notifications) your application (a webhook) when the restore process has completed.
   

#### Examples
Restore deleted resources by asset_ids '2262b0b5eb88f1fd7724e29b0e57d730' and 'd23c0526e6feca2c343e40c2fce5231a':

```multi
|curl
curl \
 -d "asset_ids[]=i2262b0b5eb88f1fd7724e29b0e57d730&asset_ids[]=d23c0526e6feca2c343e40c2fce5231a" \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/restore

|nodejs
cloudinary.v2.api.restore_by_asset_ids(
  ['i2262b0b5eb88f1fd7724e29b0e57d730', 'd23c0526e6feca2c343e40c2fce5231a']
)
.then(result => console.log(result));
```

Restore specific versions of deleted resources by asset_ids '2262b0b5eb88f1fd7724e29b0e57d730' and 'd23c0526e6feca2c343e40c2fce5231a':

```multi
|curl
curl \
 -d "asset_ids[]=i8e1a69e11c1b2161d79c9c21d410f8e&asset_ids[]=d23c0526e6feca2c343e40c2fce5231a&versions[]=c3fe4be5921eb89acd9af738c892f654&versions[]=d214063097a43d1d1293db61a397f60f" \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/restore

|nodejs
cloudinary.v2.api.restore_by_asset_ids(
  ['i8e1a69e11c1b2161d79c9c21d410f8e', 'd23c0526e6feca2c343e40c2fce5231a'],
  { 
    versions: ['c3fe4be5921eb89acd9af738c892f654', 'd214063097a43d1d1293db61a397f60f']
  }
)
.then(result => console.log(result));
```

#### Sample response
The details of the restored resources (note that when specific versions are restored, they are assigned new version IDs):

```json
{
  "image1": {
    "asset_id": "i2262b0b5eb88f1fd7724e29b0e57d730",
    "public_id": "image1",
    "version": 1719309377,
    "version_id": "ccbf6b809a83229c3ba347b4e5a5795e",
    "signature": "87c7d3e29b411e45ffaab22b0411548fc80b187f",
    "width": 587,
    "height": 507,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2024-06-25T09:56:17Z",
    "tags": [],
    "bytes": 63254,
    "type": "upload",
    "placeholder": false,
    "asset_folder": ""
  },
  "image2": {
    "asset_id": "d23c0526e6feca2c343e40c2fce5231a",
    "public_id": "image2",
    "version": 1719309372,
    "version_id": "289729a12ceba9f7cb782320c4ff6084",
    "signature": "99f1a7802df7a5e3059662309d6657e744186cdd",
    "width": 587,
    "height": 507,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2024-06-25T09:56:12Z",
    "tags": [],
    "bytes": 63254,
    "type": "upload",
    "placeholder": false,
    "asset_folder": ""
  }
}
```

---

### Restore resources by public ID
Restores one or more resources (assets), identified by the public ID, from [backup](backups_and_version_management).

#### Syntax
`POST /resources/:resource_type/:type/restore`

```multi
|ruby
Cloudinary::Api.restore(public_ids, options = {})

|php_2
$api->restore($public_ids, $options = []);

|python
cloudinary.api.restore(**public_ids, **options)

|nodejs
cloudinary.v2.api.restore(public_ids, options).then(callback);

|java
api.restore(Map public_ids, Map options);

|csharp
cloudinary.Restore(RestoreParams params);

|go
resp, err := cld.Admin.RestoreAssets(ctx, admin.RestoreAssetsParams{})

|cli
cld admin restore (public_ids) 
```

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
public\_ids | String[] | The public IDs of (deleted or existing) backed up assets to restore (array of up to 100 public_ids). By default, the latest backed up version of the asset is restored. If the `versions` parameter is specified, the corresponding version of each public ID is restored.

#### Optional parameters
Parameter | Type| Description
 --- | --- | ---
resource\_type | String| The asset type of the requested assets. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.
type | String |  The delivery type of the requested assets, relevant as a parameter only when using the SDKs (the `type` is included in the endpoint URL when using the REST API). **Possible values**: `upload`, `private`, `authenticated`, **Default**: `upload`.   
versions | String[] | The version of each of the assets to restore.  Specify the `version_id` for each public ID in the same order as the `public_ids` parameter (i.e., the first version ID corresponds to the first public ID, the second version ID to the second public ID, and so on). Use the [resource](#get_details_of_a_single_resource_by_public_id) method to list details of backed up versions of an asset.
   

#### Examples
Restore deleted resources by public_ids 'image1' and 'image2':

```multi
|curl
curl \
 -d "public_ids[]=image1&public_ids[]=image2" \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload/restore

|ruby
result = Cloudinary::Api
.restore(["image1", "image2"])

|php_2
$result = $api
->restore(["image1", "image2"]);

|python
result = cloudinary.api\
.restore(["image1", "image2"])

|nodejs
cloudinary.v2.api
.restore(["image1", "image2"])
.then(result=>console.log(result)); 

|java
result = cloudinary.api()
.restore(Arrays.asList("image1", "image2"),
  ObjectUtils.emptyMap());

|csharp
var publicIds = new List<string>(){"image1", "image2"};
cloudinary.Restore(publicIds);

|go
resp, err := cld.Admin.RestoreAssets(ctx, admin.RestoreAssetsParams{
		  PublicIDs: []string{"api_test_restore_20891", "api_test_restore_94060"}})

|cli
cld admin restore image1 image2
```

Restore specific versions of deleted resources by public_ids 'image1' and 'image2':

```multi
|curl
curl \
 -d "public_ids[]=image1&public_ids[]=image2&versions[]=c3fe4be5921eb89acd9af738c892f654&versions[]=d214063097a43d1d1293db61a397f60f" \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload/restore

|ruby
result = Cloudinary::Api
.restore(["image1", "image2"], versions => ["c3fe4be5921eb89acd9af738c892f654", "d214063097a43d1d1293db61a397f60f"])

|php_2
$result = $api
->restore(["image1", "image2"], "versions" => ["c3fe4be5921eb89acd9af738c892f654", "d214063097a43d1d1293db61a397f60f"]);

|python
result = cloudinary.api\
.restore(["image1", "image2"], versions = ["c3fe4be5921eb89acd9af738c892f654", "d214063097a43d1d1293db61a397f60f"])

|nodejs
cloudinary.v2.api
.restore(["image1", "image2"], versions: ["c3fe4be5921eb89acd9af738c892f654", "d214063097a43d1d1293db61a397f60f"])
.then(result=>console.log(result)); 

|java
result = cloudinary.api()
.restore(Arrays.asList("image1", "image2"), ObjectUtils.asMap("versions", Arrays.asList("c3fe4be5921eb89acd9af738c892f654", "d214063097a43d1d1293db61a397f60f")),
  ObjectUtils.emptyMap());

|csharp
var publicIds = new List<string>(){"image1", "image2"};
var versionIds = new List<string>(){"c3fe4be5921eb89acd9af738c892f654", "d214063097a43d1d1293db61a397f60f" };
var restoreParams = new RestoreParams(){
  PublicIds = publicIds,
  Versions = versionIds};
cloudinary.Restore(restoreParams);

|go
	resp, err := cld.Admin.RestoreAssets(ctx, admin.RestoreAssetsParams{
		PublicIDs: []string{"image1", "image2"},
		Versions:  []string{"c3fe4be5921eb89acd9af738c892f654", "d214063097a43d1d1293db61a397f60f"}})

|cli
cld admin restore image1 image2 versions=c3fe4be5921eb89acd9af738c892f654,d214063097a43d1d1293db61a397f60f
```

#### Sample response
The details of the restored resources (note that when specific versions are restored, they're assigned new version IDs):

```json
{
  "image1": {
    "asset_id": "2262b0b5eb88f1fd7724e29b0e57d730",
    "public_id": "image1",
    "version": 1719309377,
    "version_id": "ccbf6b809a83229c3ba347b4e5a5795e",
    "signature": "87c7d3e29b411e45ffaab22b0411548fc80b187f",
    "width": 587,
    "height": 507,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2024-06-25T09:56:17Z",
    "tags": [],
    "bytes": 63254,
    "type": "upload",
    "placeholder": false,
    "asset_folder": ""
  },
  "image2": {
    "asset_id": "d23c0526e6feca2c343e40c2fce5231a",
    "public_id": "image2",
    "version": 1719309372,
    "version_id": "289729a12ceba9f7cb782320c4ff6084",
    "signature": "99f1a7802df7a5e3059662309d6657e744186cdd",
    "width": 587,
    "height": 507,
    "format": "jpg",
    "resource_type": "image",
    "created_at": "2024-06-25T09:56:12Z",
    "tags": [],
    "bytes": 63254,
    "type": "upload",
    "placeholder": false,
    "asset_folder": ""
  }
}
```

---

### Update access mode (no longer supported)

> **INFO**: The `access_mode` parameter is no longer supported. To restrict access to assets, you can use the `access_control` parameter. For more details, see the [upload](image_upload_api_reference#upload) method and [Access-controlled media assets](control_access_to_media#access_controlled_media_assets).

Update the access mode of resources (assets) by public ID, by tag, or by prefix. When `access_mode` = 'authenticated', uploaded resources of type 'upload' behave as if they're of type 'authenticated'. The resource can later be made public by changing its `access_mode` to 'public', without having to update any image delivery URLs. In the case where public images are reverted to authenticated by changing their `acces_mode` to 'authenticated', all the existing original and derived versions of the images are also invalidated on the CDN.

> **NOTE**: You can only update the `access_mode` of an asset that was already assigned an `access_mode` when uploaded.

#### Syntax
`POST /resources/:resource_type/upload/update_access_mode`

```multi
|ruby
Cloudinary::Api.update_resources_access_mode(access_mode, options = {})

|php_2
Not supported by this SDK

|python
cloudinary.api.update_resources_access_mode(access_mode, **options)

|nodejs
cloudinary.v2.api.update_resources_access_mode(access_mode, options).then(callback);

|java
api.updateResourcesAccessMode(String access_mode, Map options);

|csharp
cloudinary.UpdateResourceAccessMode(RestoreParams params);

|go
Not supported by this SDK

|cli
Not supported by the CLI
```

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
access\_mode | String | The new access mode to be set. **Possible values**: `public`, `authenticated`.
**One of the following**: ||
- public\_ids | String[] | Update all assets with the specified public IDs (array of up to 100 public_ids). 
- prefix | String | Update all assets where the public ID starts with the specified prefix (up to a maximum of 100 matching original assets).
- tag| String | Update all assets with the specified tag (up to a maximum of 100 matching original assets). 

#### Optional parameters
Parameter | Type| Description
 --- | --- | ---
resource\_type | String | The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`. 

#### Examples
Update the access mode of uploaded images by public IDs:

```multi
|curl
curl \
  -d "access_mode=public&public_ids[]=image1&public_ids[]=image2" \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload/update_access_mode

|ruby
result = Cloudinary::Api
.update_resources_access_mode_by_ids('public', 
  ['image1', 'image2'])

|php_2
Not supported by this SDK

|python
result = cloudinary.api\
.update_resources_access_mode_by_ids("public", 
  ["image1", "image2"])

|nodejs
cloudinary.v2.api
.update_resources_access_mode_by_ids("public", 
  ['image1', 'image2'])
.then(result=>console.log(result)); 

|java
result = api
.updateResourcesAccessModeByIds("public", 
  Arrays.asList("image1", "image2"), null);

|csharp
var updateResourceAccessModeParams = new UpdateResourceAccessModeParams(){
  AccessMode = "public",
  PublicIds = new List<string>(){"image1", "image2"}};
cloudinary.UpdateResourceAccessModeByIds(updateResourceAccessModeParams);

|go
Not supported by this SDK

|cli
Not supported by the CLI
```

Update the access mode of uploaded videos by prefix:

```multi
|curl
curl \
  -d "access_mode=public&prefix=to-publish" \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/video/upload/update_access_mode
  
|ruby
result = Cloudinary::Api
.update_resources_access_mode_by_prefix('public', "to-publish", 
  resource_type: "video")

|php_2
Not supported by this SDK

|python
result = cloudinary.api\
.update_resources_access_mode_by_prefix("public", "to-publish", 
  resource_type = "video")

|nodejs
cloudinary.v2.api
.update_resources_access_mode_by_prefix("public", "to-publish",
  { resource_type: 'video'})
.then(result=>console.log(result)); 

|java
result = api
.updateResourcesAccessModeByPrefix("public", "to-publish", 
  ObjectUtils.asMap("resource_type", "video"));

|csharp
var updateResourceAccessModeParams = new UpdateResourceAccessModeParams(){
  AccessMode = "public",
  ResourceType = "video"};
cloudinary.UpdateResourceAccessModeByPrefix("to-publish", updateResourceAccessModeParams);

|go
Not supported by this SDK

|cli
Not supported by the CLI
```

 Update the access mode of uploaded images by tag:

```multi
|curl
curl \
  -d "access_mode=public&tag=20170216" \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload/update_access_mode

|ruby
result = Cloudinary::Api
.update_resources_access_mode_by_tag('public', '20170216')

|php_2
Not supported by this SDK

|python
result = cloudinary.api\
.update_resources_access_mode_by_tag("public", "20170216")

|nodejs
cloudinary.v2.api
.update_resources_access_mode_by_tag('public', "20170216")
.then(result=>console.log(result)); 

|java
result = api.updateResourcesAccessModeByTag("public", "20170216", null);

|csharp
var updateResourceAccessModeParams = new UpdateResourceAccessModeParams(){
  AccessMode = "public"};
cloudinary.UpdateResourceAccessModeByTag("20170216", updateResourceAccessModeParams);

|go
Not supported by this SDK

|cli
Not supported by the CLI
```

#### Sample response
```json
{
    "updated": {
      "image1": "updated",
      "image2": "updated"
    },
    "failed": {
    },
}
```

---

### Add related assets by asset ID

Relates an asset to other assets by their asset IDs, an immutable identifier, regardless of public ID, display name, asset folder, resource type or deliver type.

This method allows you to indicate that the asset is logically related to other assets in some way (e.g., similar content, or a peripheral asset like video/transcript, etc). This is a bidirectional process, meaning that the asset will also be added as a related\_asset to all the other assets specified. The relation is also a one to many relationship, where the asset is related to all the assets specified, but those assets aren't also related to each other.

> **TIP**: Calling the [Get the details of a single resource](#get_the_details_of_a_single_resource) method with the `related` parameter set to `true`, will include the list of related assets in the response.

#### Syntax
`POST /resources/related_assets/:asset_id`

```multi
|ruby
Cloudinary::Api.add_related_assets_by_asset_id(asset_id, assets_to_relate, options={})

|php_2
$api->addRelatedAssetsByAssetId($assetId, $assetsToRelate, $options = []);

|python
cloudinary.api.add_related_assets_by_asset_id(asset_id, assets_to_relate, **options)

|nodejs
cloudinary.v2.api.add_related_assets_by_asset_id(asset_id, assets_to_relate, options).then(callback);

|java
api.addRelatedAssetsByAssetId(String asset_id, Map assets_to_relate, Map options);

|csharp
cloudinary.AddRelatedResourcesByAssetId(AddRelatedResourcesByAssetIdParams params);

|go
resp, err := cld.Admin.AddRelatedAssetsByAssetId(ctx, admin.AddRelatedAssetsByAssetIdParams{})

|cli
cld admin add_related_assets_by_asset_id (asset_id, assets_to_relate) 
```

#### URL parameters
Parameter | Type| Description
 --- | --- | ---
asset\_id |String | The asset ID of the asset to update.

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
assets\_to\_relate | Array |  Relates the asset to all the assets specified in this array of up to 10 assets, specified by their asset IDs. **For example**: `["e12345b0efc00c0fcf","f12345a5c7c00c0f12"]`

#### Examples
Relate the asset with a asset ID of 'c789c1234bbb0e' to the assets with IDs of 'f12345a5c789c' and 'bbb0efc00c0f12':

```multi
|curl
curl \
 -d '{"assets_to_relate":["f12345a5c789c","bbb0efc00c0f12"]}' \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/related_assets/c789c1234bbb0e

|ruby
result = Cloudinary::Api.add_related_assets_by_asset_id("c789c1234bbb0e",
  ["f12345a5c789c","bbb0efc00c0f12"])

|php_2
$result = $api->addRelatedAssetsByAssetId("c789c1234bbb0e",
  ["f12345a5c789c","bbb0efc00c0f12"]);


|python
result = cloudinary.api.add_related_assets_by_asset_id("c789c1234bbb0e", 
  ["f12345a5c789c","bbb0efc00c0f12"])

|nodejs
cloudinary.v2.api.add_related_assets_by_asset_id("c789c1234bbb0e",
  ["f12345a5c789c","bbb0efc00c0f12"])
  .then(result=>console.log(result)); 

|java
cloudinary.api().addRelatedResourcesByAssetId("c789c1234bbb0e", 
  Arrays.asList(
    "f12345a5c789c","bbb0efc00c0f12"),
  ObjectUtils.emptyMap());

|csharp
var assetIds = new List<string>(){"f12345a5c789c","bbb0efc00c0f12"};
cloudinary.AddRelatedResourcesByAssetId(new AddRelatedResourcesByAssetIdParams(){
  AssetId = "c789c1234bbb0e",
  AssetsToRelate = assetIds
});

|go
resp, err := cld.Admin.AddRelatedAssetsByAssetId(ctx, admin.AddRelatedAssetsByAssetIdParams{
  AssetId:        "c789c1234bbb0e",
	AssetsToRelate: []string{"f12345a5c789c","bbb0efc00c0f12"}})

|cli
cld admin add_related_assets_by_asset_id c789c1234bbb0e f12345a5c789c bbb0efc00c0f12
```

#### Sample response
```json
{
  "failed": [],
  "success": [
    {
      "message": "success",
      "code": "success_ids",
      "asset_id": "f12345a5c789c",
      "status": 200
    },
    {
      "message": "success",
      "code": "success_ids",
      "asset_id": "bbb0efc00c0f12",
      "status": 200
    }
  ]
}
```

---

### Add related assets by public ID
Relates an asset to other assets by public IDs. This allows you to indicate that the asset is logically related to other assets in some way (e.g., similar content, or a peripheral asset like video/transcript, etc). This is a bidirectional process, meaning that the asset is also added as a related\_asset to all the other assets specified. The relation is also a one to many relationship, where the asset is related to all the assets specified, but those assets aren't also related to each other.

> **TIP**: Calling the [Get the details of a single resource](#get_the_details_of_a_single_resource) method with the `related` parameter set to `true`, will include the list of related assets in the response.

#### Syntax
`POST /resources/related_assets/:resource_type/:type/:public_id`

```multi
|ruby
Cloudinary::Api.add_related_assets(public_id, assets_to_relate, options={})

|php_2
$api->addRelatedAssets($publicId, $assetsToRelate, $options = []);

|python
cloudinary.api.add_related_assets(public_id, assets_to_relate, **options)

|nodejs
cloudinary.v2.api.add_related_assets(public_id, assets_to_relate, options).then(callback);

|java
api.addRelatedAssets(String public_id, Map assets_to_relate, Map options);

|csharp
cloudinary.AddRelatedResources(AddRelatedResourcesParams params);

|go
resp, err := cld.Admin.AddRelatedAssets(ctx, admin.AddRelatedAssetsParams{})

|cli
cld admin add_related_assets (public_id, assets_to_relate) 
```

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
public\_id | The public ID of the asset.
assets\_to\_relate | Array |  Relates the asset to all the other assets specified in this array of up to 10 assets, specified as `resource_type/type/public_id`. **For example**: `["image/upload/dog","video/authenticated/cat"]`

#### Optional parameters
Parameter | Type | Description
 --- | --- | ---
resource\_type | String| The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.   
type | String |  The delivery type, relevant as a parameter only when using the SDKs (the `type` is included in the endpoint URL when using the REST API). **Possible values**: `upload` (default), `private`, or `authenticated`.

#### Examples
Relate the asset with a public ID of 'video/upload/dog' to the assets with public IDs of 'image/authenticated/dog_license' and 'raw/upload/dog_subtitles.srt':

```multi
|curl
curl \
 -d '{"assets_to_relate":["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"]}' \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/related_assets/image/upload/dog

|ruby
result = Cloudinary::Api.add_related_assets("dog",
  ["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"])

|php_2
$result = $api->addRelatedAssets("dog",
  ["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"]);


|python
result = cloudinary.api.add_related_assets("dog", 
  ["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"])

|nodejs
cloudinary.v2.api.add_related_assets("dog",
  ["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"])
  .then(result=>console.log(result)); 

|java
cloudinary.api().addRelatedResources("dog", 
  Arrays.asList(
    "raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"),
  ObjectUtils.emptyMap());

|csharp
var assetIds = new List<string>(){"raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"};
cloudinary.AddRelatedResources(new AddRelatedResourcesParams(){
  PublicId = "dog",
  AssetsToRelate = assetIds
});

|go
resp, err := cld.Admin.AddRelatedAssets(ctx, admin.AddRelatedAssetsParams{
  PublicID:  "dog",
	AssetsToRelate: []string{"raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"}})

|cli
cld admin add_related_assets dog raw/upload/dog_subtitles.srt,image/authenticated/dog_license
```

#### Sample response
```json
{
  "failed": [],
  "success": [
    {
      "message": "success",
      "code": "success_ids",
      "asset": "raw/upload/dog_subtitles.srt",
      "status": 200
    },
    {
      "message": "success",
      "code": "success_ids",
      "asset": "image/authenticated/dog_license",
      "status": 200
    }
  ]
}
```

---

### Delete related assets by asset ID

Unrelates the asset from other assets, specified by their asset IDs, an immutable identifier, regardless of public ID, display name, asset folder, resource type or deliver type. This is a bidirectional process, meaning that the asset will also be removed as a related\_asset from all the other assets specified. See [Add related assets by asset id](#add_related_assets_by_asset_id) for more information.

#### Syntax
`DELETE /resources/related_assets/:asset_id`

```multi
|ruby
Cloudinary::Api.delete_related_assets_by_asset_id(asset_id, assets_to_unrelate, options={})

|php_2
$api->deleteRelatedAssetsByAssetId($assetId, $assetsToUnelate, $options = []);

|python
cloudinary.api.delete_related_assets_by_asset_id(asset_id, assets_to_unrelate, **options)

|nodejs
cloudinary.v2.api.delete_related_assets_by_asset_id(asset_id, assets_to_unrelate, options).then(callback);

|java
api.deleteRelatedAssetsByAssetId(String asset_id, Map assets_to_unrelate, Map options);

|csharp
cloudinary.DeleteRelatedResourcesByAssetId(DeleteRelatedResourcesByAssetIdParams params);

|go
resp, err := cld.Admin.DeleteRelatedAssetsByAssetId(ctx, admin.DeleteRelatedAssetsByAssetIdParams{})

|cli
cld admin delete_related_assets_by_asset_id (asset_id, assets_to_unrelate) 
```

#### URL parameters
Parameter | Type| Description
 --- | --- | ---
asset\_id |String | The asset ID of the asset to update.

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
assets\_to\_unrelate | Array |  Unrelates the asset from all the assets specified in this array of assets, specified by their asset IDs. **For example**: `["f12345af123c789c","45a5c789a5c789c5c7"]`

#### Examples
Unrelate the asset with a asset ID of 'c789c1234bbb0e' from the assets with IDs of 'a5c789c5c745a' and 'a1623c3b234a':

```multi
|curl
curl \
 -d '{"assets_to_unrelate":["f12345a5c789c","bbb0efc00c0f12"]}' \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/related_assets/c789c1234bbb0e

|ruby
result = Cloudinary::Api.delete_related_assets_by_asset_id("c789c1234bbb0e",
  ["f12345a5c789c","bbb0efc00c0f12"])

|php_2
$result = $api->deleteRelatedAssetsByAssetId("c789c1234bbb0e",
  ["f12345a5c789c","bbb0efc00c0f12"]);


|python
result = cloudinary.api.delete_related_assets_by_asset_id("c789c1234bbb0e", 
  ["f12345a5c789c","bbb0efc00c0f12"])

|nodejs
cloudinary.v2.api.delete_related_assets_by_asset_id("c789c1234bbb0e",
  ["f12345a5c789c","bbb0efc00c0f12"])
  .then(result=>console.log(result)); 

|java
cloudinary.api().deleteRelatedResourcesByAssetId("c789c1234bbb0e", 
  Arrays.asList(
    "f12345a5c789c","bbb0efc00c0f12"),
  ObjectUtils.emptyMap());

|csharp
var assetIds = new List<string>(){"f12345a5c789c","bbb0efc00c0f12"};
cloudinary.DeleteRelatedResourcesByAssetId(new DeleteRelatedResourcesByAssetIdParams(){
  AssetId = "c789c1234bbb0e",
  AssetsToUnrelate = assetIds
});

|go
resp, err := cld.Admin.DeleteRelatedAssetsByAssetId(ctx, admin.DeleteRelatedAssetsByAssetIdParams{
  AssetId:  "c789c1234bbb0e",
	AssetsToUnrelate: []string{"f12345a5c789c","bbb0efc00c0f12"}})

|cli
cld admin delete_related_assets_by_asset_id c789c1234bbb0e f12345a5c789c bbb0efc00c0f12
```

#### Sample response
```json
{ 
  "failed": [] , 
  "deleted": [{
    "asset_id": "f12345a5c789c", 
    "message": "success"
  },
  {
    "asset_id": "bbb0efc00c0f12", 
    "message": "success"
  }]
}
```

---

### Delete related assets by public ID
Unrelates the asset from other assets, specified by public IDs. This is a bidirectional process, meaning that the asset will also be removed as a related\_asset from all the other assets specified. See [Add related assets](#add_related_assets) for more information.

#### Syntax
`DELETE /resources/related_assets/:resource_type/:type/:public_id`

```multi
|ruby
Cloudinary::Api.delete_related_assets(public_id, assets_to_unrelate, options={})

|php_2
$api->deleteRelatedAssets($publicId, $assetsToUnrelate, $options = []);

|python
cloudinary.api.delete_related_assets(public_id, assets_to_unrelate, **options)

|nodejs
cloudinary.v2.api.delete_related_assets(public_id, assets_to_unrelate, options).then(callback);

|java
api.addRelatedAssets(String public_id, Map assets_to_unrelate, Map options);

|csharp
cloudinary.DeleteRelatedResources(DeleteRelatedResourcesParams params);

|go
resp, err := cld.Admin.DeleteRelatedAssets(ctx, admin.DeleteRelatedAssetsParams{})

|cli
cld admin delete_related_assets (public_id, assets_to_unrelate) 
```

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
public\_id |String | The public ID of the asset to update.
assets\_to\_unrelate | Array |  Unrelates the asset from all the assets specified in this array of assets, specified as `resource_type/type/public_id`. **For example**: `["image/upload/dog","video/authenticated/cat"]`

#### Optional parameters
Parameter | Type | Description
 --- | --- | ---
resource\_type | String| The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.   
type | String |  The delivery type, relevant as a parameter only when using the SDKs (the `type` is included in the endpoint URL when using the REST API). **Possible values**: `upload` (default), `private`, or `authenticated`.

#### Examples
Unrelate the asset with a public ID of 'image/upload/dog' from the assets with public IDs of 'raw/upload/dog_subtitles.srt' and 'video/authenticated/animals':

```multi
|curl
curl \
 -d '{"assets_to_unrelate":["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"]}' \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/related_assets/image/upload/dog

|ruby
result = Cloudinary::Api.delete_related_assets("dog",
  ["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"])

|php_2
$result = $api->deleteRelatedAssets("dog",
  ["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"]);


|python
result = cloudinary.api.delete_related_assets("dog", 
  ["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"])

|nodejs
cloudinary.v2.api.delete_related_assets("dog",
  ["raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"])
  .then(result=>console.log(result)); 

|java
cloudinary.api().deleteRelatedResources("dog", 
  Arrays.asList(
    "raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"),
  ObjectUtils.emptyMap());

|csharp
var assetIds = new List<string>(){"raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"};
cloudinary.DeleteRelatedResources(new DeleteRelatedResourcesParams(){
  PublicId = "dog",
  AssetsToRelate = assetIds
});

|go
resp, err := cld.Admin.DeleteRelatedAssets(ctx, admin.DeleteRelatedAssetsParams{
  PublicID:  "dog",
	AssetsToRelate: []string{"raw/upload/dog_subtitles.srt", "image/authenticated/dog_license"}})

|cli
cld admin delete_related_assets dog raw/upload/dog_subtitles.srt,image/authenticated/dog_license
```

#### Sample response
```json
{ 
  "failed": [] , 
  "deleted": [{
    "asset": "raw/upload/dog_subtitles.srt", 
    "message": "success"
  },
  {
    "asset": "image/authenticated/dog_license", 
    "message": "success"
  }]
}
```

---

### Delete resources by asset ID

Deletes resources (assets) uploaded to your product environment by their asset IDs. This enables you to delete assets by their unique and immutable identifier, regardless of public ID, display name, asset folder, resource type or deliver type.

#### Syntax
`DELETE /resources`

```multi
|nodejs
cloudinary.v2.api.delete_resources_by_asset_ids(asset_ids, options).then(callback);
```

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
asset\_ids | String[] | Delete all assets with the specified asset IDs (array of up to 100 asset_ids).  

#### Optional parameters
Parameter | Type | Description
 --- | --- | ---                         
keep\_original | Boolean | Whether to delete only the derived assets. **Default**: `false`.
invalidate | Boolean | Whether to also invalidate the copies of the resource on the CDN. It usually takes between a few seconds and a few minutes for the invalidation to fully propagate through the CDN. There are also a number of other [important considerations](invalidate_cached_media_assets_on_the_cdn) to keep in mind when invalidating files. Note that by default this parameter is not enabled: if you need this parameter enabled, please open a [support request](https://support.cloudinary.com/hc/en-us/requests/new). **Default**: `false`.
next\_cursor | String | (Only when deleting by prefix or all) When a deletion request has more than 1000 resources to delete, the response includes the `partial` boolean parameter set to true, as well as a `next_cursor` value. You can then specify this returned `next_cursor` value as a parameter of the following deletion request.
transformations | String |  Only the derived assets matching this hash of transformation parameters will be deleted. You can include multiple transformations separated by a pipe character (<code>&#124;).

#### Examples
Delete uploaded images by asset IDs:

```multi
|curl
curl \
  -d "asset_ids[]=ajskeity2738vlwl&asset_ids[]=ajeutiw3j2kd83la" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources

|nodejs
cloudinary.v2.api.delete_resources_by_asset_ids(
  ['ajskeity2738vlwl', 'ajeutiw3j2kd83la']
).then(callback);
```

#### Sample response
```json
{
	"deleted": {
  		"image1": "deleted",
  		"image2": "deleted"
	},
	"partial": false
}
```

---

### Delete resources by public ID
Deletes resources (assets) uploaded to your product environment, identified by their public IDs.

#### Syntax
`DELETE /resources/:resource_type/:type`

```multi
|ruby
Cloudinary::Api.delete_resources(public_ids, options = {})

|php_2
$api->deleteAssets($public_ids, $options = []);

|python
cloudinary.api.delete_resources(**public_ids, **options)

|nodejs
cloudinary.v2.api.delete_resources(public_ids, options).then(callback);

|java
api.deleteResources(Map public_ids, Map options);

|csharp
cloudinary.DeleteResources(DelResParams params);

|go
resp, err := cld.Admin.DeleteAssets(ctx, admin.DeleteAssetsParams{})

|cli
cld admin delete_resources (public_ids) 
```

#### Required parameters
One of the following:

Parameter | Type| Description 
 --- | --- | ---
public\_ids | String[] | Delete all assets with the specified public IDs (array of up to 100 public_ids). 
prefix | String | Delete all assets, including derived assets, where the public ID starts with the specified prefix (up to a maximum of 1000 original resources).
all | Boolean | Delete all assets (of the relevant resource_type and type), including derived assets (up to a maximum of 1000 original resources). 

#### Optional parameters
Parameter | Type | Description
 --- | --- | ---
resource\_type | String| The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.   
type | String |  The delivery type, relevant as a parameter only when using the SDKs (the `type` is included in the endpoint URL when using the REST API). **Possible values**: `upload`, `private`, `fetch`,`authenticated`, `facebook`, `twitter`, `gravatar`, `youtube`, `hulu`, `vimeo`, `animoto`, `worldstarhiphop`, `dailymotion`, `list`. **Default**: `upload`.                         
keep\_original | Boolean | Whether to delete only the derived assets. **Default**: `false`.
invalidate | Boolean | Whether to also invalidate the copies of the resource on the CDN. It usually takes between a few seconds and a few minutes for the invalidation to fully propagate through the CDN. There are also a number of other [important considerations](invalidate_cached_media_assets_on_the_cdn) to keep in mind when invalidating files. Note that by default this parameter isn't enabled: if you need this parameter enabled, please open a [support request](https://support.cloudinary.com/hc/en-us/requests/new). **Default**: `false`.
next\_cursor | String | (Only when deleting by prefix or all) When a deletion request has more than 1000 resources to delete, the response includes the `partial` boolean parameter set to true, as well as a `next_cursor` value. You can then specify this returned `next_cursor` value as a parameter of the following deletion request.
transformations | String |  Only the derived assets matching this hash of transformation parameters will be deleted. You can include multiple transformations separated by a pipe character (<code>&#124;).

#### Examples
Delete uploaded images by public IDs:

```multi
|curl
curl \
  -d "public_ids[]=image1&public_ids[]=image2" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload

|ruby
result = Cloudinary::Api
.delete_resources(['image1', 'image2'])

|php_2
$result = $api
->deleteAssets(["image1", "image2"]);

|python
result = cloudinary.api\
.delete_resources(["image1", "image2"])

|nodejs
cloudinary.v2.api
.delete_resources(['image1', 'image2'])
.then(result=>console.log(result)); 

|java
result = api
.deleteResources(Arrays.asList("image1", "image2"),
  ObjectUtils.emptyMap());

|csharp
var delResParams = new DelResParams(){
  PublicIds = new List<string>{"image1", "image2"}};
cloudinary.DeleteResources(delResParams);

|go
resp, err := adminAPI.DeleteAssets(ctx, admin.DeleteAssetsParams{
      PublicIDs: []string{"api_test_restore_20891", "api_test_restore_94060"}})

|cli
cld admin delete_resources image1 image2
```

Delete Facebook pictures by public IDs:

```multi
|curl
curl \
  -d "public_ids=4" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/facebook

|ruby
result = Cloudinary::Api
.delete_resources(['4'], 
  type: "facebook")

|php_2
$result = $api
->deleteAssets(["4"], 
   ["type" => "facebook"]);

|python
result = cloudinary.api\
.delete_resources(["4"], 
  type = "facebook")

|nodejs
cloudinary.v2.api
.delete_resources(['4'], 
  { type: 'facebook' })
.then(result=>console.log(result)); 

|java
result = api
.deleteResources(Arrays.asList("4"),
  ObjectUtils.asMap("type", "facebook"));

|csharp
var delResParams = new DelResParams(){
  PublicIds = new List<string>{"4"},
  Type = "facebook"};
cloudinary.DeleteResources(delResParams);

|go
resp, err := cld.Admin.DeleteAssets(ctx, admin.DeleteAssetsParams{
  		PublicIDs:    []string{"4"},
	  	DeliveryType: "facebook"})

|cli
cld admin delete_resources "4" type="facebook"
```

Delete uploaded images by prefix:

```multi
|curl
curl \
  -d "prefix=sunday" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload

|ruby
result = Cloudinary::Api
.delete_resources_by_prefix('sunday')

|php_2
$result = $api
->deleteAssetsByPrefix("sunday");

|python
result = cloudinary.api\
.delete_resources_by_prefix("sunday")

|nodejs
cloudinary.v2.api
.delete_resources_by_prefix('sunday')
.then(result=>console.log(result)); 

|java
result = api
.deleteResourcesByPrefix("sunday", 
  ObjectUtils.emptyMap());

|csharp
result = cloudinary.DeleteResourcesByPrefix("sunday");

|go
resp, err := cld.Admin.DeleteAssetsByPrefix(ctx, admin.DeleteAssetsByPrefixParams{
  		Prefix: []string{"sunday"}})

|cli
cld admin delete_resources_by_prefix "sunday"
```

Delete derived images only:

```multi
|curl
curl \
  -d "public_ids[]=image1&public_ids[]=image2&keep_original=1" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/upload

|ruby
result = Cloudinary::Api
.delete_resources(['image1', 'image2'],
  keep_original: true)

|php_2
$result = $api
->deleteAssets(["image1", "image2"],
  ["keep_original" => true]);

|python
result = cloudinary.api\
.delete_resources(["image1", "image2"],
  keep_original = True)

|nodejs
cloudinary.v2.api
.delete_resources(['image1', 'image2'], 
  { keep_original: true})
.then(result=>console.log(result)); 

|java
result = api
.deleteResources(Arrays.asList("image1", "image2"),
<OBJECT></OBJECT>ObjectUtils.asMap("keep_original", true));

|csharp
var delResParams = new DelResParams(){
PublicIds = new List<string>{"image1", "image2"},
  KeepOriginal = true};
cloudinary.DeleteResources(delResParams);

|go
resp, err := cld.Admin.DeleteAssetsByPrefix(ctx, admin.DeleteAssetsByPrefixParams{
      Prefix:    		[]string{"image1", "image2"},
      KeepOriginal: 	api.Bool(true)})

|cli
cld admin delete_resources image1 image2 keep_original=true
```

Delete all Facebook pictures:

```multi
|curl
curl \
  -d "all=true" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/facebook

|ruby
result = Cloudinary::Api
.delete_all_resources(
  type: "facebook")

|php_2
$result = $api
->deleteAllAssets(
  ["type" => "facebook"]);

|python
result = cloudinary.api\
.delete_all_resources(
  type = "facebook")

|nodejs
cloudinary.v2.api
.delete_all_resources(
  {type: 'facebook'})
.then(result=>console.log(result)); 

|java
result = api
.deleteAllResources(
  ObjectUtils.asMap("type", "facebook"));

|csharp
var delResParams = new DelResParams(){
  Type = "facebook",
  All = true};
cloudinary.DeleteResources(delResParams);

|go
resp, err := cld.Admin.DeleteAllAssets(ctx, admin.DeleteAllAssetsParams{
      DeliveryType: "facebook",
      All:          api.Bool(true)})

|cli
cld admin delete_all_resources type="facebook"
```

#### Sample response
```json
{
	"deleted": {
  		"image1": "deleted",
  		"image2": "deleted"
	},
	"partial": false
}
```

---

### Delete resources by tags

Deletes resources (assets) with a specified tag. 

#### Syntax
`DELETE /resources/:resource_type/tags/:tag`

```multi
|ruby
Cloudinary::Api.delete_resources_by_tag(tag, options = {})

|php_2
$api->deleteAssetsByTag($tag, $options = []);

|python
cloudinary.api.delete_resources_by_tag(tag, **options)

|nodejs
cloudinary.v2.api.delete_resources_by_tag(tag, options).then(callback);

|java
api.deleteResourcesByTag(String tag, Map options);

|csharp
cloudinary.DeleteResourcesByTag(String tag);

|go
resp, err := cld.Admin.DeleteAssetsByTag(ctx, admin.DeleteAssetsByTagParams{})

|cli
cld admin delete_resources_by_tag (tag) 
```

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
tag | String | Delete all assets (and their derivatives) with the specified tag name (up to a maximum of 1000 original assets).

#### Optional parameters
Parameter | Type | Description
 --- | --- | ---
resource\_type | String | The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.  
keep_original | Boolean | Whether to delete only the derived assets. **Default**: `false`.      
invalidate | Boolean | Whether to also invalidate the copies of the resource on the CDN. It usually takes between a few seconds and a few minutes for the invalidation to fully propagate through the CDN. There are also a number of other [important considerations](invalidate_cached_media_assets_on_the_cdn) to keep in mind when invalidating files. Note that by default this parameter isn't enabled: if you need this parameter enabled, please open a [support request](https://support.cloudinary.com/hc/en-us/requests/new). **Default**: `false`.
next\_cursor | String | When a deletion request has more than 1000 resources to delete, the response includes the `partial` boolean parameter set to true, as well as a `next_cursor` value. You can then specify this returned `next_cursor` value as a parameter of the following deletion request.
transformations | String |  Only the derived assets matching this hash of transformation parameters will be deleted. 

#### Examples
Delete images by tag name:

```multi
|curl
curl \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/image/tags/mytag

|ruby
result = Cloudinary::Api
.delete_resources_by_tag('mytag')

|php_2
$result = $api
->deleteAssetsByTag("mytag");

|python
result = cloudinary.api\
.delete_resources_by_tag("mytag")

|nodejs
cloudinary.v2.api
.delete_resources_by_tag('mytag')
.then(result=>console.log(result)); 

|java
result = api
.deleteResourcesByTag("mytag", ObjectUtils.emptyMap());

|csharp
result = cloudinary
.DeleteResourcesByTag("mytag");

|go
resp, err := cld.Admin.DeleteAssetsByTag(ctx, admin.DeleteAssetsByTagParams{
      Tag:  "mytag"})

|cli
cld admin delete_resources_by_tag mytag
```

#### Sample response
```json
{
	"deleted": {
  		"image1": "deleted",
  		"image2": "deleted"
	},
	"partial": false
}
```

---
### Delete derived resources

Deletes derived assets from your product environment.

#### Syntax
`DELETE /derived_resources`

```multi
|ruby
Cloudinary::Api.delete_derived_resources(derived_resource_ids, options = {})

|php_2
$api->deleteDerivedAssets($derived_resource_ids, $options = []);

|python
cloudinary.api.delete_derived_resources(**derived_resource_ids, **options)

|nodejs
cloudinary.v2.api.delete_derived_resources(derived_resource_ids, options).then(callback);

|java
api.deleteDerivedResources(Iterable<String> derivedResourceIds, Map options)

|csharp
cloudinary.DeleteDerivedResources(List<string> DerivedResourceIds);

|go
resp, err := cld.Admin.DeleteDerivedAssets(ctx, admin.DeleteDerivedAssetsParams{DerivedAssetIDs})


|cli
cld admin delete_derived_resources (derived_resource_ids) 
```

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
derived\_resource\_ids | String[] | Delete all assets with the specified derived_resource_ids IDs (array of up to 100 IDs). The derived asset IDs are returned when calling the [Details of a single resource](#get_details_of_a_single_resource_by_public_id) method.

#### Examples
Delete assets by derived asset IDs (8267a869b62a93a59248f35d7f124c1f and 383e22a57167445552a3cdc16f0a0c85):

```multi
|curl
curl \
  -d "derived_resource_ids[]=8267a869b62a93a59248f35d7f124c1f&derived_resource_ids[]=383e22a57167445552a3cdc16f0a0c85" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/derived_resources

|ruby
result = Cloudinary::Api
.delete_derived_resources(['8267a869b62a93a59248f35d7f124c1f', '383e22a57167445552a3cdc16f0a0c85'])

|php_2
$result = $api
->deleteDerivedAssets(["8267a869b62a93a59248f35d7f124c1f", "383e22a57167445552a3cdc16f0a0c85"]);

|python
result = cloudinary.api\
.delete_derived_resources(["8267a869b62a93a59248f35d7f124c1f", "383e22a57167445552a3cdc16f0a0c85"])

|nodejs
cloudinary.v2.api
.delete_derived_resources(['8267a869b62a93a59248f35d7f124c1f', '383e22a57167445552a3cdc16f0a0c85'])
.then(result=>console.log(result)); 

|java
result = api
.deleteDerivedResources(Arrays.asList("8267a869b62a93a59248f35d7f124c1f", "383e22a57167445552a3cdc16f0a0c85"),
  ObjectUtils.emptyMap());

|csharp
var result = cloudinary.DeleteDerivedResources(
    new List<string> { "8267a869b62a93a59248f35d7f124c1f", "383e22a57167445552a3cdc16f0a0c85" }
);

|go
resp, err := cld.Admin.DeleteDerivedAssets(ctx, admin.DeleteDerivedAssetsParams{
      DerivedAssetIDs: []string{"8267a869b62a93a59248f35d7f124c1f", "383e22a57167445552a3cdc16f0a0c85"}})

|cli
cld admin delete_derived_resources 8267a869b62a93a59248f35d7f124c1f 383e22a57167445552a3cdc16f0a0c85
```

---

### Delete backed up versions of a resource

Deletes backed up versions of an asset (resource) from your product environment.

> **INFO**: Deleting from backup is irreversible and any deleted versions from a backed up asset can't be recovered in any way.

#### Syntax
`DELETE /resources/backup/:asset_id`

#### Required parameters
Parameter | Type| Description
 --- | --- | ---
asset\_id | String | The asset ID of the asset with backed up versions to delete.
version\_ids | String[] | An array of version IDs to delete for the specified asset ID. You can call the [resource](#get_details_of_a_single_resource_by_public_id) method (with `versions = true`) to list details of backed up versions of an asset.

#### Examples
Delete versions 383e22a57167445552a3cdc16f0a0c85 and 5552aa57e67445552a3cdc1110a0115 of the asset with ID 8267a869b62a93a59248f35d7f124c1f:

```multi
|curl
curl \
  -d "version_ids[]=5552aa57e67445552a3cdc1110a0115&version_ids[]=383e22a57167445552a3cdc16f0a0c85" \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/backup/8267a869b62a93a59248f35d7f124c1f
```

## resources_last_access_reports

> **INFO**: The last access reports feature and methods are currently available upon request, and only for accounts with an [Enterprise plan](https://cloudinary.com/pricing#pricing-enterprise). Please contact our [Enterprise support and sales team](https://cloudinary.com/contact?plan=enterprise) or your CSM to request this feature.

Last access reports present a list of all the assets (resources) that have been accessed for the last time within a given time range. In addition, all last access reports automatically include any assets that were never accessed. This information can then be used for bulk deleting assets that you determine are no longer needed and thereby free up your storage space.

The last access report is based on an analysis of the CDN access logs for all requests that delivered content from your product environment. An asset's 'last access' date is updated with the timestamp of the most recent HTTP request to the CDN for that asset, either the original or a derived/transformed version of it.

> **TIP**: For customers with the last access feature enabled, bulk deleting assets based on their last access time is also a self-service operation available in the [Cloudinary Console](https://console.cloudinary.com/app/settings/settings/bulk_delete/new).

![bulk delete by last access](https://cloudinary-res.cloudinary.com/image/upload/f_auto/q_auto/bo_3px_solid_black/docs/bulk-delete-by-last-access "thumb: w_500,dpr_2, width:500, with_code:false, with_url:false, popup:true")

> **NOTE**: Last access reports include all assets in your product environment, including assets with public IDs containing whitespace or special characters. The only exception is assets used in overlays/underlays, for which the last access time can't be determined, and so these assets are excluded from all last access reports.

Method | Description
---|---
POST<code class="code-method">/resources\_last\_access\_reports | [Create a last access report](#create_a_last_access_report)
GET<code class="code-method">/resources\_last\_access\_reports | [Get all last access reports](#get_all_last_access_reports) 
GET<code class="code-method">/resources\_last\_access\_reports/:report\_id |[Get the details of a last access report](#get_the_details_of_a_last_access_report)
GET<code class="code-method">/resources/last\_access\_report/:report\_id | [Get resources in a last access report](#get_resources_in_a_last_access_report)

---

### Create a last access report

Creates a last access report.

#### Syntax
`POST /resources_last_access_reports`

#### Required parameters
At least 1 of the following is required.

Parameter | Type | Description
---|---|---
from\_date | String |  All assets accessed after this date, given in the format: yyyy-mm-dd
to\_date | String |  All assets accessed before this date, given in the format: yyyy-mm-dd

#### Optional parameters
Parameter | Type | Description
---|---|---
resource\_type | String | The type of asset. **Possible values**: `image`, `raw`, or `video`. **Default**: all. **Note**: Use `video` for all video and audio assets, such as .mp3.       
type | String |  The delivery type. **Possible values**: Any supported [delivery type](image_transformations#delivery_types). **Default**: all.
exclude\_folders | String[] |  An array of up to 50 folders to exclude from the last access report. 
sort\_by  | String |  A string value representing the field to sort by. **Possible values**: `accessed_at` (default), `resource_type`, `created_at`.
direction | String | The sort direction, **Possible values**:  `asc` (default) or `desc`.

#### Examples
Create a report for videos last accessed no more recently than the 1st of February 2020, that excludes all assets in the 'docs' and 'website' folders, and sorts the results by the date they were created:

```curl
curl \
  -H "Content-Type: application/json" \
  -d '{
        "to_date": "2020-02-01",
        "resource_type": "video",
        "exclude_folders": ["docs", "website"],
        "sort_by": "created_at"
      }' \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources_last_access_reports
``` 

#### Sample response
```json
{
    "message": "created",
    "id": "f6460d726c41f5fec0dbfbcd458e71fc76e97e9a87749fc2dfa9d8eb42f93e9e"
}
```

---

### Get all last access reports

Retrieves a list of all the last access reports created.

#### Syntax
`GET /resources_last_access_reports`

```multi
|php_2
$api->allAssetsLastAccessUpdate($options = []);
```

#### Optional parameters
Parameter | Type | Description
---|---|---
max\_results | Integers |  Maximum number of assets to return (up to 500). **Default**: `10`. 
next\_cursor | String |  When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of the following request.

#### Examples
Get a list of all the last access reports.

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources_last_access_reports

|php_2
$result = $adminApi->allAssetsLastAccessUpdate();
```

#### Sample response
```json
{    
    "reports": [
        {
            "id": "d31ebc134cd7096af46ca833bf74cb25efac9f46a846bea5d3b61a2dec52d10e",
            "status": "done",
            "params": {
                "to_date": "2019-07-13",
                "resource_type": "image",
                "type": "facebook",
                "sort_by": "accessed_at",
                "direction": "asc"
            },
            "created_at": "2020-02-08T02:14:48Z" 
        }    
    ]  
}
```

---

### Get the details of a last access report 

Returns the details of a given report. doesn't include the report data.

#### Syntax
`GET /resources_last_access_reports/:report_id`

```multi
|php_2
$api->lastAccessUpdateDetails($reportId, $options = []);
```

#### Required parameters
Parameter | Type | Description
---|---|---
report\_id | String |  The ID number of a previously generated report.

#### Examples
Request the details of a given report id.

```multi
|curl
https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources_last_access_reports/f6460d726c41f5fec0dbfbcd458e71fc76e97e9a87749fc2dfa9d8eb42f93e9e

|php_2
$result = $adminApi->lastAccessUpdateDetails('f6460d726c41f5fec0dbfbcd458e71fc76e97e9a87749fc2dfa9d8eb42f93e9e');
``` 

#### Sample response
```json
{
    "id": "f6460d726c41f5fec0dbfbcd458e71fc76e97e9a87749fc2dfa9d8eb42f93e9e",
    "status": "done",    
    "params": {
          "to_date": "2020-02-01",
            "resource_type": "video",
            "exclude_folders": ["docs", "website"],
            "sort_by": "created_at"  
      },    
      "created_at": "2020-06-12T15:39:45Z"
  }
```

> **NOTE**: When a report is first [created](#create_a_last_access_report), depending on the report requested, it might take some time for Cloudinary to generate it. The status for that particular report will be `pending` until it completes and then has a status of `done`.

---

### Get resources in a last access report

Returns the list of resources in a given report.

#### Syntax
`GET /resources/last_access_report/:report_id`

#### Required parameters
Parameter | Type | Description
---|---|---
report\_id | String |  The ID number of a previously generated report.

#### Optional parameters
Parameter | Type | Description
---|---|---
max\_results | Integers |  Maximum number of assets to return (up to 500). **Default**: `10`. 
next\_cursor | String |  When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of the following request.

#### Examples
Request the list of resources in a given report id.

```curl
https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/resources/last_access_report/f6460d726c41f5fec0dbfbcd458e71fc76e97e9a87749fc2dfa9d8eb42f93e9e
``` 
 

#### Sample response
```json
{
    "resources": [
      {
        "asset_id": "ebfe9f427f4a6787ea00e00da9e67f9e",
        "public_id": "face_center",
        "format": "jpg",
        "version": 1719305903,
        "resource_type": "image",
        "type": "upload",
        "created_at": "2024-02-25T08:58:23Z",
        "bytes": 379132,
        "width": 1870,
        "height": 1250,
        "asset_folder": "",
        "display_name": "face_center",
        "url": "http://res.cloudinary.com/cld-docs/image/upload/v1719305903/face_center.jpg",
        "secure_url": "https://res.cloudinary.com/cld-docs/image/upload/v1719305903/face_center.jpg",
        "last_access": "2024-03-29T03:33:39Z"
      },
      {
        "asset_id": "a13dc5a232a28c03bf5881ac39b94d2c",
        "public_id": "65646572251",
        "format": "jpg",
        "resource_type": "image",
        "type": "facebook",
        "created_at": "2024-03-25T09:01:30Z",
        "bytes": 0,
        "asset_folder": "",
        "display_name": "65646572251",
        "url": "http://res.cloudinary.com/cld-docs/image/facebook/65646572251.jpg",
        "secure_url": "https://res.cloudinary.com/cld-docs/image/facebook/65646572251.jpg",
        "last_access": "2024-04-24T04:32:27Z"
      },
    ]
}
```

## streaming_profiles

Run in Postman
Learn more about running Postman collections

Enables you to list, get details of, create, modify, or delete built-in and custom [adaptive streaming profiles](adaptive_bitrate_streaming), which can be used to deliver your video using HLS and MPEG-DASH adaptive bitrate streaming.

Method | Description
---|---
GET<code class="code-method">/streaming_profiles | [Lists the adaptive streaming profiles.](#get_adaptive_streaming_profiles)
GET<code class="code-method">/streaming_profiles/:name | [Lists the details of a single streaming profile specified by name.](#get_details_of_a_single_streaming_profile)
POST<code class="code-method">/streaming_profiles | [Creates a new streaming profile.](#create_a_streaming_profile)
PUT<code class="code-method">/streaming_profiles/:name | [Updates the specified existing streaming profile.](#update_an_existing_streaming_profile)
DELETE<code class="code-method">/streaming_profiles/:name | [Deletes or reverts the specified streaming profile.](#delete_or_revert_the_specified_streaming_profile)

---
### Get adaptive streaming profiles

List streaming profiles, including built-in and custom profiles.

#### Syntax
`GET /streaming_profiles`

```multi

|ruby
Cloudinary::Api.list_streaming_profiles

|php_2
$api->listStreamingProfiles();

|python
cloudinary.api.list_streaming_profiles()

|nodejs
cloudinary.v2.api.list_streaming_profiles().then(callback);

|java
api.listStreamingProfiles();

|csharp
cloudinary.ListStreamingProfiles()

|go
resp, err := cld.Admin.ListStreamingProfiles(ctx, admin.ListStreamingProfilesParams{})

|cli
cld admin list_streaming_profiles

```
#### Sample response
The response contains an array of all the defined streaming profiles.

```json
{
  "data": [
    {
      "name": "4k",
      "display_name": "4K (2160p)",
      "predefined": true
    },
    {
      "name": "full_hd",
      "display_name": "Full HD (1080p)",
      "predefined": true
    },
    {
      "name": "hd",
      "display_name": "HD (720p)",
      "predefined": true
    },
    {
      "name": "sd",
      "display_name": "SD (480p)",
      "predefined": true
    },
    {
      "name": "full_hd_wifi",
      "display_name": "Full HD WiFi (1080p)",
      "predefined": true
    },
    {
      "name": "full_hd_lean",
      "display_name": "Full HD Lean (1080p)",
      "predefined": true
    },
    {
      "name": "hd_lean",
      "display_name": "HD Lean (720p)",
      "predefined": true
    },
    {
      "name": "custom_square",
      "display_name": "Custom square resolution",
      "predefined": false
    }
  ]
}
```
---

### Get details of a single streaming profile

Retrieve the details of a single streaming profile by name.

#### Syntax
`GET /streaming_profiles/:name`

```multi

|ruby
Cloudinary::Api.get_streaming_profile(name)

|php_2
$api->getStreamingProfile($name);

|python
cloudinary.api.get_streaming_profile(name)

|nodejs
cloudinary.v2.api.get_streaming_profile(name).then(callback);

|java
api.getStreamingProfile(String name);

|csharp
cloudinary.GetStreamingProfile(name)

|go
resp, err := cld.Admin.GetStreamingProfile(ctx, admin.GetStreamingProfileParams{})

|cli
cld admin get_streaming_profile (name)

```

#### Required parameters
Parameter | Type | Description
---|---|---
name | String | The name of the streaming profile to get the details of.

#### Examples
Get the details of a specified streaming file:

```multi

|ruby
result = Cloudinary::Api
.get_streaming_profile('custom_square')

|php_2
$result = $api
->getStreamingProfile("custom_square");

|python
result = cloudinary.api\
.get_streaming_profile("custom_square")

|nodejs
cloudinary.v2.api
.get_streaming_profile('custom_square')
.then(result=>console.log(result)); 

|java
result = api
.getStreamingProfile("custom_square");

|csharp
result = cloudinary
.GetStreamingProfile("custom_square")

|go
resp, err := cld.Admin.GetStreamingProfile(ctx, admin.GetStreamingProfileParams{Name: "custom_square"})

|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/streaming_profiles/custom_square

|cli
cld admin get_streaming_profile "custom_square"
```

#### Sample response
The response contains details for a single streaming profile.

```json
{
 "data": {
   "name": "custom_square",
   "display_name": "Custom square resolution",
   "predefined": false,
   "representations": [
     {
       "transformation": {
         "width": 1200, "height": 1200, "bit_rate": "5m", "video_codec": "h264:main:3.1"
       }
     },
     {
       "transformation": {
         "width": 900, "height": 900, "bit_rate": "3500k", "video_codec": "h264:main:3.1"
       }
     },
     {
       "transformation": {
         "width": 600, "height": 600, "bit_rate": "1500k", "video_codec": "h264:baseline:3.0"
       }
     }
   ]
 }
}

```
---

### Create a streaming profile

Create a new, custom streaming profile.

#### Syntax
`POST /streaming_profiles`

```multi

|ruby
Cloudinary::Api.create_streaming_profile(name, options = {})

|php_2
$api->createStreamingProfile($name, $options = []);

|python
cloudinary.api.create_streaming_profile(name, **options)

|nodejs
cloudinary.v2.api.create_streaming_profile(name, options).then(callback);

|java
api.createStreamingProfile(String name, Map options);

|csharp
cloudinary.CreateStreamingProfile(StreamingProfileCreateParams params);

|go
resp, err := cld.Admin.CreateStreamingProfile(ctx, admin.CreateStreamingProfileParams{})

|cli
cld admin create_streaming_profile (name) 
```

#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| name | String | The identification name to assign to the new streaming profile. The name is case-insensitive and can contain alphanumeric characters, underscores (_) and hyphens (-). |
| representations | JSON string | An array of structures that defines a custom streaming profile.**Note**: When using the SDKs, specify the `representations` parameter in the `options` object. |
| transformation | String or Hash | Specifies the transformation parameters for the representation. All video transformation parameters except `video_sampling` are supported. Common transformation parameters for representations include: `width`, `height` (or `aspect_ratio`), `bit_rate`, `video_codec`, `audio_codec`, `sample_rate` (or `fps`), etc. **Note**: When using the SDKs, specify the `transformation` parameter in the `options` object. |

#### Optional parameters
| Parameter | Type | Description |
|---|---|---|---|
| display_name | String | A descriptive name for the profile.  |

#### Examples
Create a streaming profile with 3 representations:

```multi

|ruby
result = Cloudinary::Api
.create_streaming_profile("custom_square",
  display_name: "Custom square resolution",
  representations: 
    [{transformation: {crop: "limit", width: "1200", height: "1200", bit_rate: "5m"}},
     {transformation: {crop: "limit", width: "900", height: "900", bit_rate: "3500k"}}
     {transformation: {crop: "limit", width: "600", height: "600", bit_rate: "1500k"}}])

|php_2
$result = $api
->createStreamingProfile("custom_square", [
    "display_name" => "Custom square resolution",
    "representations" => [
      ["crop" => "limit", "width" => 1200, "height" => 1200, "bit_rate" => "5m"],
      ["crop" => "limit", "width" => 900, "height" => 900, "bit_rate" => "3500k"],
      ["crop" => "limit", "width" => 600, "height" => 600, "bit_rate" => "1500k"]]]);

|python
result = cloudinary.api\
.create_streaming_profile("custom_square",
  display_name="Custom square resolution",
  representations=[
    {"transformation": {"crop": "limit", "width": 1200, "height": 1200, "bit_rate": "5m"}},
    {"transformation": {"crop": "limit", "width": 900, "height": 900, "bit_rate": "3500k"}},
    {"transformation": {"crop": "limit", "width": 600, "height": 600, "bit_rate": "1500k"}}])

|nodejs
cloudinary.v2.api
.create_streaming_profile('custom_square',
  { display_name: "Custom square resolution",
    representations: [
    { transformation:{crop: "limit", width: 1200, height: 1200, bit_rate: "5m" }},
    { transformation:{crop: "limit", width: 900, height: 900, bit_rate: "3500k" }},
    { transformation:{crop: "limit", width: 600, height: 600, bit_rate: "1500k" }}] })
.then(result=>console.log(result)); 

|java
result = api
.createStreamingProfile("custom_square", "Custom square resolution",
  Arrays.asList(
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(1200).height(1200).bitRate("5m")),
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(900).height(900).bitRate("3500k")),
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(600).height(600).bitRate("1500k"))));

|csharp
var streamingProfileParams = new StreamingProfileCreateParams()
  {
    Name = "custom_square",
    DisplayName = "Custom square resolution",
    Representations = new List<Representation>
      {
        new Representation {Transformation = new Transformation().Crop("limit").Width(1200).Height(1200).BitRate("5m")},
        new Representation {Transformation = new Transformation().Crop("limit").Width(900).Height(900).BitRate("3500k")},
		new Representation {Transformation = new Transformation().Crop("limit").Width(600).Height(600).BitRate("1500k")}
      }
  };
cloudinary.CreateStreamingProfile(streamingProfileParams);

|go
resp, err := cld.Admin.CreateStreamingProfile(ctx, admin.CreateStreamingProfileParams{
      Name:        "custom_square",
      DisplayName: "Custom square resolution",
      Representations: admin.StreamingProfileRepresentations{
          {Transformation: "c_limit,w_1200,h_1200,br_5m"},
          {Transformation: "c_limit,w_900,h_900,br_3500k"},
          {Transformation: "c_limit,w_600,h_600,br_1500k"},
		}})

|curl
curl \
  -d 'name=custom_square&display_name=Custom%20square%20resolution&representations=\[\{%22transformation%22:%22c_limit,w_1200,h_1200,br_5m%22\},\{%22transformation%22:%22c_limit,w_900,h_900,br_3500k%22\},\{%22transformation%22:%22c_limit,w_600,h_600,br_1500k%22\}\]'
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/streaming_profiles

|cli
cld admin create_streaming_profile "custom_square" display_name="Custom square resolution" representations='[{"transformation": {"crop": "limit","width": 1200, "height": 1200, "bit_rate": "5m"}},{"transformation": {"crop": "limit", "width": 900, "height": 900, "bit_rate": "3500k"}},{"transformation": {"crop": "limit", "width": 600, "height": 600, "bit_rate": "1500k"}}]'

```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response
The response contains details for the streaming profile that was created.

```json
{
 "data": {
   "name": "custom_square",
   "display_name": "Custom square resolution",
   "predefined": false,
   "representations": [
     {
       "transformation": {
         "width": 1200, "height": 1200, "bit_rate": "5m", "video_codec": "h264:main:3.1"
       }
     },
     {
       "transformation": {
         "width": 900, "height": 900, "bit_rate": "3500k", "video_codec": "h264:main:3.1"
       }
     },
     {
       "transformation": {
         "width": 600, "height": 600, "bit_rate": "1500k", "video_codec": "h264:baseline:3.0"
       }
     }
   ]
 }
}

```

Create a streaming profile with 6 representations and a combination of codecs:

```multi

|ruby
result = Cloudinary::Api
.create_streaming_profile("custom_square_combo",
  display_name: "Custom square resolution with combination of codecs",
  representations: 
    [{transformation: {crop: "limit", width: "1200", height: "1200", video_codec: "h265", bit_rate: "5m"}},
     {transformation: {crop: "limit", width: "900", height: "900", video_codec: "h265", bit_rate: "3500k"}},
     {transformation: {crop: "limit", width: "600", height: "600", video_codec: "h265", bit_rate: "1500k"}},
     {transformation: {crop: "limit", width: "1200", height: "1200", video_codec: "vp9", bit_rate: "5m"}},
     {transformation: {crop: "limit", width: "900", height: "900", video_codec: "vp9", bit_rate: "3500k"}}
     {transformation: {crop: "limit", width: "600", height: "600", video_codec: "vp9", bit_rate: "1500k"}}])

|php_2
$result = $api
->createStreamingProfile("custom_square_combo", [
    "display_name" => "Custom square resolution with combination of codecs",
    "representations" => [
      ["crop" => "limit", "width" => 1200, "height" => 1200, "video_codec" => "h265", "bit_rate" => "5m"],
      ["crop" => "limit", "width" => 900, "height" => 900, "video_codec" => "h265", "bit_rate" => "3500k"],
      ["crop" => "limit", "width" => 600, "height" => 600, "video_codec" => "h265", "bit_rate" => "1500k"],
      ["crop" => "limit", "width" => 1200, "height" => 1200, "video_codec" => "vp9", "bit_rate" => "5m"],
      ["crop" => "limit", "width" => 900, "height" => 900, "video_codec" => "vp9", "bit_rate" => "3500k"],
      ["crop" => "limit", "width" => 600, "height" => 600, "video_codec" => "vp9", "bit_rate" => "1500k"]]);      

|python
result = cloudinary.api\
.create_streaming_profile("custom_square_combo",
  display_name="Custom square resolution with combination of codecs",
  representations=[
    {"transformation": {"crop": "limit", "width": 1200, "height": 1200, "video_codec": "h265", "bit_rate": "5m"}},
    {"transformation": {"crop": "limit", "width": 900, "height": 900, "video_codec": "h265", "bit_rate": "3500k"}},
    {"transformation": {"crop": "limit", "width": 600, "height": 600, "video_codec": "h265", "bit_rate": "1500k"}},
    {"transformation": {"crop": "limit", "width": 1200, "height": 1200, "video_codec": "vp9", "bit_rate": "5m"}},
    {"transformation": {"crop": "limit", "width": 900, "height": 900, "video_codec": "vp9", "bit_rate": "3500k"}},
    {"transformation": {"crop": "limit", "width": 600, "height": 600, "video_codec": "vp9", "bit_rate": "1500k"}}])

|nodejs
cloudinary.v2.api
.create_streaming_profile('custom_square_combo',
  { display_name: "Custom square resolution with combination of codecs",
    representations: [
    { transformation:{crop: "limit", width: 1200, height: 1200, video_codec: "h265", bit_rate: "5m" }},
    { transformation:{crop: "limit", width: 900, height: 900, video_codec: "h265", bit_rate: "3500k" }},
    { transformation:{crop: "limit", width: 600, height: 600, video_codec: "h265", bit_rate: "1500k" }},
    { transformation:{crop: "limit", width: 1200, height: 1200, video_codec: "vp9", bit_rate: "5m" }},
    { transformation:{crop: "limit", width: 900, height: 900, video_codec: "vp9", bit_rate: "3500k" }},
    { transformation:{crop: "limit", width: 600, height: 600, video_codec: "vp9", bit_rate: "1500k" }}] })
.then(result=>console.log(result)); 

|java
result = api
.createStreamingProfile("custom_square_combo", "Custom square resolution with combination of codecs",
  Arrays.asList(
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(1200).height(1200).videoCodec("h265").bitRate("5m")),
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(900).height(900).videoCodec("h265").bitRate("3500k")),
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(600).height(600).videoCodec("h265").bitRate("1500k")),
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(1200).height(1200).videoCodec("vp9").bitRate("5m")),
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(900).height(900).videoCodec("vp9").bitRate("3500k")),
    ObjectUtils.asMap("transformation", new 
      Transformation().crop("limit").width(600).height(600).videoCodec("vp9").bitRate("1500k"))));      

|csharp
var streamingProfileParams = new StreamingProfileCreateParams()
  {
    Name = "custom_square",
    DisplayName = "Custom square resolution",
    Representations = new List<Representation>
      {
        new Representation {Transformation = new Transformation().Crop("limit").Width(1200).Height(1200).BitRate("5m")},
        new Representation {Transformation = new Transformation().Crop("limit").Width(900).Height(900).BitRate("3500k")},
		new Representation {Transformation = new Transformation().Crop("limit").Width(600).Height(600).BitRate("1500k")}
        new Representation { Transformation = new Transformation().Crop("limit").Width(1200).Height(1200).VideoCodec("vp9").BitRate("5m")},
        new Representation { Transformation = new Transformation().Crop("limit").Width(900).Height(900).VideoCodec("vp9").BitRate("3500k")},
		new Representation { Transformation = new Transformation().Crop("limit").Width(600).Height(600).VideoCodec("vp9").BitRate("1500k")}
      }
  };
cloudinary.CreateStreamingProfile(streamingProfileParams);

|go
resp, err := cld.Admin.CreateStreamingProfile(ctx, admin.CreateStreamingProfileParams{
      Name:        "custom_square",
      DisplayName: "Custom square resolution",
      Representations: admin.StreamingProfileRepresentations{
          {Transformation: "c_limit,w_1200,h_1200,vc_h265,br_5m"},
          {Transformation: "c_limit,w_900,h_900,vc_h265,br_3500k"},
          {Transformation: "c_limit,w_600,h_600,vc_h265,br_1500k"},
          {Transformation: "c_limit,w_1200,h_1200,vc_vp9,br_5m"},
          {Transformation: "c_limit,w_900,h_900,vc_vp9,br_3500k"},
          {Transformation: "c_limit,w_600,h_600,vc_vp9,br_1500k"},
		}})

|curl
curl \
  -d 'name=custom_square_combo&display_name=Custom%20square%20resolution%20with%20combination%20of%20codecs&representations=\[\{%22transformation%22:%22c_limit,w_1200,h_1200,vc_h264,br_5m%22\},\{%22transformation%22:%22c_limit,w_900,h_900,vc_h264,br_3500k%22\},\{%22transformation%22:%22c_limit,w_600,h_600,vc_h264,br_1500k%22\},\{%22transformation%22:%22c_limit,w_1200,h_1200,vc_vp9,br_5m%22\},\{%22transformation%22:%22c_limit,w_900,h_900,vc_vp9,br_3500k%22\},\{%22transformation%22:%22c_limit,w_600,h_600,vc_vp9,br_1500k%22\}\]'
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/streaming_profiles

|cli
cld admin create_streaming_profile "custom_square_combo" display_name="Custom square resolution with combination of codecs" representations='[{"transformation": {"crop": "limit", "width": 1200, "height": 1200, "video_codec": "h265", "bit_rate": "5m"}},{"transformation": {"crop": "limit", "width": 900, "height": 900, "video_codec": "h265", "bit_rate": "3500k"}},{"transformation": {"crop": "limit", "width": 600, "height": 600, "video_codec": "h265", "bit_rate": "1500k"}},{"transformation": {"crop": "limit", "width": 1200, "height": 1200, "video_codec": "vp9", "bit_rate": "5m"}},{"transformation": {"crop": "limit", "width": 900, "height": 900, "video_codec": "vp9", "bit_rate": "3500k"}},{"transformation": {"crop": "limit", "width": 600, "height": 600, "video_codec": "vp9", "bit_rate": "1500k"}}]'
```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response
The response contains details for the streaming profile that was created.

```json
{
  "data":{
    "name":"custom_square_combo",
    "display_name":"Custom square resolution with combination of codecs",
    "predefined":false,
    "representations":[
      {
        "transformation":[
          {
            "width":1200,
            "height":1200,
            "video_codec":"h265",
            "bit_rate":"5m",
            "crop":"limit"
          }
        ]
      },
      {
        "transformation":[
          {
            "width":900,
            "height":900,
            "video_codec":"h265",
            "bit_rate":"3500k",
            "crop":"limit"
          }
        ]
      },
      {
        "transformation":[
          {
            "width":600,
            "height":600,
            "video_codec":"h265",
            "bit_rate":"1500k",
            "crop":"limit"
          }
        ]
      },
      {
        "transformation":[
          {
            "width":1200,
            "height":1200,
            "video_codec":"vp9",
            "bit_rate":"5m",
            "crop":"limit"
          }
        ]
      },
      {
        "transformation":[
          {
            "width":900,
            "height":900,
            "video_codec":"vp9",
            "bit_rate":"3500k",
            "crop":"limit"
          }
        ]
      },
      {
        "transformation":[
          {
            "width":600,
            "height":600,
            "video_codec":"vp9",
            "bit_rate":"1500k",
            "crop":"limit"
          }
        ]
      }
    ]
  }
}

```
---
### Update an existing streaming profile

Update the specified existing streaming profile. You can update both custom and built-in profiles. The specified list of representations replaces the previous list.

#### Syntax
`PUT /streaming_profiles`

```multi

|ruby
Cloudinary::Api.update_streaming_profile(name, options = {})

|php_2
$api->updateStreamingProfile($name, $options = []);

|python
cloudinary.api.update_streaming_profile(name, **options)

|nodejs
cloudinary.v2.api.update_streaming_profile(name, options).then(callback);

|java
api.updateStreamingProfile(String name, Map options);

|csharp
cloudinary.UpdateStreamingProfile(String name, StreamingProfileUpdateParams params);

|go
resp, err := cld.Admin.UpdateStreamingProfile(ctx, admin.UpdateStreamingProfileParams{})

|cli
cld admin update_streaming_profile (name) 

```

#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| name | String | The identification name to assign to the new streaming profile. The name is case-insensitive and can contain alphanumeric characters, underscores (_) and hyphens (-). |
| representations | JSON string | An array of structures that defines a custom streaming profile. **Note**: When using the SDKs, specify the `representations` parameter in the `options` object. |
| transformation | String or Hash | Specifies the transformation parameters for the representation. All video transformation parameters except `video_sampling` are supported. Common transformation parameters for representations include: `width`, `height` (or `aspect_ratio`), `bit_rate`, `video_codec`, `audio_codec`, `sample_rate` (or `fps`), etc. **Note**: When using the SDKs, specify the `transformation` parameter in the `options` object.|

#### Optional parameters
| Parameter | Type | Description |
|---|---|---|---|
| display_name | String | A descriptive name for the profile.  |

#### Examples
Add a fourth (fallback) representation to an existing custom streaming profile:

```multi

|ruby
result = Cloudinary::Api
.update_streaming_profile("custom_square",  
representations: 
  [{transformation: {crop: "limit", width: "1200", height: "1200", bit_rate: "5m"}},
   {transformation: {crop: "limit", width: "900", height: "900", bit_rate: "3500k"}},
   {transformation: {crop: "limit", width: "600", height: "600", bit_rate: "1500k"}},
   {transformation: {crop: "limit", width: "320", height: "320", bit_rate: "192k"}}])

|php_2
$result = $api
->updateStreamingProfile("custom_square", [
    "representations" => [
      ["transformation" => ["crop" => "limit", "width" => 1200, "height" => 1200, "bit_rate" => "5m"]],
      ["transformation" => ["crop" => "limit", "width" => 900, "height" => 900, "bit_rate" => "3500k"]],
      ["transformation" => ["crop" => "limit", "width" => 600, "height" => 600, "bit_rate" => "1500k"]],
      ["transformation" => ["crop" => "limit", "width" => 320, "height" => 320, "bit_rate" => "192k"]]]]);

|python
result = cloudinary.api\
.update_streaming_profile("custom_square",
  representations=[
    {"transformation": {"crop": "limit", "width": 1200, "height": 1200, "bit_rate": "5m"}},
    {"transformation": {"crop": "limit", "width": 900, "height": 900, "bit_rate": "3500k"}},
    {"transformation": {"crop": "limit", "width": 600, "height": 600, "bit_rate": "1500k"}},
    {"transformation": {"crop": "limit", "width": 320, "height": 320, "bit_rate": "192k"}}])

|nodejs
cloudinary.v2.api
.update_streaming_profile('custom_square',
  { representations: [
    { transformation: {crop: "limit", width: 1200, height: 1200, bit_rate: "5m" }},
    { transformation: {crop: "limit", width: 900, height: 900, bit_rate: "3500k" }},
    { transformation: {crop: "limit", width: 600, height: 600, bit_rate: "1500k" }},
    { transformation: {crop: "limit", width: 320, height: 320, bit_rate: "192k" }}]})
.then(result=>console.log(result)); 

|java
result = api
.updateStreamingProfile("custom_square", null,
  Arrays.asList(
    new Transformation().crop("limit").width(1200).height(1200).bit_rate("5m"),
    new Transformation().crop("limit").width(900).height(900).bit_rate("3500k"),
    new Transformation().crop("limit").width(600).height(600).bit_rate("1500k"),
    new Transformation().crop("limit").width(320).height(320).bit_rate("192k")));

|csharp
var streamingUpdateParams = new StreamingProfileUpdateParams()
  {
    Representations = new List<Representation>
      {
        new Representation {Transformation = new Transformation().Crop("limit").Width(1200).Height(1200).BitRate("5m")},
        new Representation {Transformation = new Transformation().Crop("limit").Width(900).Height(900).BitRate("3500k")},
		new Representation {Transformation = new Transformation().Crop("limit").Width(600).Height(600).BitRate("1500k")},
		new Representation {Transformation = new Transformation().Crop("limit").Width(320).Height(320).BitRate("192k")},
      }
  };
	cloudinary.UpdateStreamingProfile("custom_square", streamingUpdateParams);

|go
resp, err := cld.Admin.UpdateStreamingProfile(ctx, admin.UpdateStreamingProfileParams{
      Name: "custom_square",
      Representations: admin.StreamingProfileRepresentations{
          {Transformation: "c_limit,w_1200,h_1200,br_5m"},
          {Transformation: "c_limit,w_900,h_900,br_3500k"},
          {Transformation: "c_limit,w_600,h_600,br_1500k"},
          {Transformation: "c_limit,w_320,h_320,br_192k"},
		}})

|curl
curl \
  -d 'representations=\[\{%22transformation%22:%22c_limit,w_1200,h_1200,br_5m%22\},\{%22transformation%22:%22c_limit,w_900,h_900,br_3500k%22\},\{%22transformation%22:%22c_limit,w_600,h_600,br_1500k%22\},\{%22transformation%22:%22c_limit,w_320,h_320,br_192k%22\}\]' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/streaming_profiles/custom_square

|cli
cld admin update_streaming_profile "custom_square" representations='[{"transformation": {"crop": "limit", "width": 1200, "height": 1200, "bit_rate": "5m"}},{"transformation": {"crop": "limit", "width": 900, "height": 900, "bit_rate": "3500k"}},{"transformation": {"crop": "limit", "width": 600, "height": 600, "bit_rate": "1500k"}},{"transformation": {"crop": "limit", "width": 320, "height": 320, "bit_rate": "192k"}}]'
```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response
The response contains details for the streaming profile that was updated.

```json
{
  "message": "updated",
  "data": {
    "name": "custom_square",
    "display_name": "Custom square resolution",
    "predefined": false,
    "representations": [
      {
        "transformation": {
          "width": 1200, "height": 1200, "bit_rate": "5m", "video_codec": "h264:main:3.1"
        }
      },
      {
        "transformation": {
          "width": 900, "height": 900, "bit_rate": "3500k", "video_codec": "h264:main:3.1"
        }
      },
      {
        "transformation": {
          "width": 600, "height": 600, "bit_rate": "1500k", "video_codec": "h264:baseline:3.0"
        }
      }
      {
        "transformation": {
          "width": 320, "height": 320, "bit_rate": "192k", "video_codec": "h264:baseline:3.0"
        }
      }                
    ]
  }
}

```
---

### Delete or revert the specified streaming profile

For custom streaming profiles, delete the specified profile.

For built-in streaming profiles, if the built-in profile was modified, revert the profile to the original settings. 

For built-in streaming profiles that haven't been modified, the **Delete** method returns an error.

#### Syntax
`DELETE /streaming_profiles/:name`

```multi
|ruby
Cloudinary::Api.delete_streaming_profile(name)

|php_2
$api->deleteStreamingProfile($name);

|python
cloudinary.api.delete_streaming_profile(name)

|nodejs
cloudinary.v2.api.delete_streaming_profile(name).then(callback);

|java
api.deleteStreamingProfile(String name);

|csharp
cloudinary.DeleteStreamingProfile(name);

|go
resp, err := cld.Admin.DeleteStreamingProfile(ctx, admin.DeleteStreamingProfileParams{})

|cli
cld admin delete_streaming_profile (name)
```

#### Required parameters
Parameter | Type | Description
---|---|---
name | String | The name of the streaming profile to delete or revert.

#### Examples
Delete the custom_square streaming file:

```multi
|ruby
result = Cloudinary::Api
.delete_streaming_profile('custom_square')

|php_2
$result = $api
->deleteStreamingProfile("custom_square");

|python
result = cloudinary.api\
.delete_streaming_profile("custom_square")

|nodejs
cloudinary.v2.api
.delete_streaming_profile('custom_square')
.then(result=>console.log(result)); 

|java
result = api
.deleteStreamingProfile("custom_square");

|csharp
result = cloudinary
.DeleteStreamingProfile("custom_square");

|go
resp, err := cld.Admin.DeleteStreamingProfile(ctx, admin.DeleteStreamingProfileParams{Name: "custom_square"})

|curl
curl \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/streaming_profiles/custom_square

|cli
cld admin delete_streaming_profile "custom_square"
```

#### Sample response
```json
{ "message": "deleted" }
```

## tags

Run in Postman
Learn more about running Postman collections

Enables you to retrieve a list of all the tags currently used for a specified resource_type.

Method | Description
---|---
GET <code class="code-method">/tags | [Lists tags used for a specified resource type.](#get_tags)

---
### Get tags

#### Syntax
`GET /tags/:resource_type `

```multi
|ruby
Cloudinary::Api.tags

|php_2
$api->tags();

|python
cloudinary.api.tags()

|nodejs
cloudinary.v2.api.tags().then(callback);

|java
api.tags(ObjectUtils.emptyMap());

|csharp
cloudinary.ListTags();

|go
resp, err := cld.Admin.Tags(ctx, admin.TagsParams{})

|cli
cld admin tags
```

#### Optional parameters
Parameter | Type | Description
---|---|---
resource\_type | String | The type of asset. Relevant as a parameter only when using the SDKs (the `resource_type` is included in the endpoint URL when using the REST API). **Note**: use `video` for all video and audio assets, such as .mp3. **Possible values**: `image` (default), `raw`, `video`.
prefix | String | Find all tags that start with the specified prefix.
max\_results | Integers |  Maximum number of assets to return (up to 500). **Default**: `10`. 
next\_cursor | String | When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of a following request.

#### Examples
List tags for all images

```multi
|ruby
result = Cloudinary::Api
.tags

|php_2
$result = $api
->tags();

|python
result = cloudinary.api\
.tags()

|nodejs
cloudinary.v2.api
.tags()
.then(result=>console.log(result)); 

|java
api.tags(ObjectUtils.emptyMap());

|csharp
result = cloudinary
.ListTags();

|go
resp, err := cld.Admin.Tags(ctx, admin.TagsParams{})

|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/tags/image

|cli
cld admin tags
```

List tags that start with 'pro' for all images:

```multi
|ruby
result = Cloudinary::Api
.tags(prefix: "pro")

|php_2
$result = $api
->tags(["prefix" => "pro"]);

|python
result = cloudinary.api\
.tags(prefix = "pro")

|nodejs
cloudinary.v2.api
.tags({prefix: 'pro'})
.then(result=>console.log(result)); 

|java
result = api
.tags(ObjectUtils.asMap("prefix", "pro"));

|csharp
result = cloudinary
.ListTagsByPrefix("pro");

|go
resp, err := cld.Admin.Tags(ctx, admin.TagsParams{Prefix: "pro"})

|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/tags/image?prefix=pro

|cli
cld admin tags prefix="pro"
```

#### Sample response
```json
{
  "tags": [
    "arrow_animation",
    "logo"
  ]
}
```

## transformations

Run in Postman
Learn more about running Postman collections

Enables you to manage stored transformations. See the [Image transformations](image_transformations) and [video transformations](video_manipulation_and_delivery) documentation for more information.

Method | Description
---|---
GET <code class="code-method">/transformations | [Lists all transformations.](#get_transformations) 
GET <code class="code-method">/transformations/:transformation | [Lists details of a single transformation specified by name or parameters.](#get_transformation_details)
POST<code class="code-method">/transformations/:name | [Creates a new named transformation.](#create_a_named_transformation)
PUT<code class="code-method">/transformations/:transformation | [Updates a specified transformation.](#update_transformation)
DELETE<code class="code-method">/transformations/:transformation | [Deletes a specified transformation.](#delete_transformation)

---

### Get transformations

List all transformations.

#### Syntax
`GET /transformations`

```multi
|ruby 
Cloudinary::Api.transformations(options = {})

|php_2
$api->transformations($options = []);

|python 
cloudinary.api.transformations(**options)

|nodejs
cloudinary.v2.api.transformations(options).then(callback);

|java 
api.transformations(Map options);

|csharp
cloudinary.ListTransformations(TransformParams params);

|go
resp, err := cld.Admin.ListTransformations(ctx, admin.ListTransformationsParams{})

|cli
cld admin transformations (options)

```

#### Optional parameters
| Parameter | Type | Description |
|---|---|---|---|
| max\_results | Integer | Maximum number of transformations to return (up to 500). **Default**: `10`.  |
| next\_cursor | String | When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of a following request. |
| named | Boolean | Whether to return only named (`true`) or unnamed (`false`) transformations. If this parameter isn't included, both named and unnamed transformations will be returned. |

#### Examples
List all transformations:

```multi
|ruby 
result = Cloudinary::Api
.transformations

|php_2
$result = $api
->transformations();

|python 
result = cloudinary.api\
.transformations()

|nodejs
cloudinary.v2.api
.transformations()
.then(result=>console.log(result));

|java 
result = api
.transformations(ObjectUtils.emptyMap());

|csharp
result = cloudinary
.ListTransformations();

|go
resp, err := cld.Admin.ListTransformations(ctx, admin.ListTransformationsParams{})

|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations

|cli
cld admin transformations
```

#### Sample response
The response contains an array of transformations. If the number of transformations exceeds the `max_results` value, the `next_cursor` parameter is also returned. You can specify this value as the `next_cursor` parameter of the following listing request.

```json
{
    "transformations": [
    {
        "name": "t_Aspen_LUT",
        "allowed_for_strict": true,
        "used": false,
        "named": true
    },
    {
        "name": "w_110,h_100,c_fill",
        "allowed_for_strict": false,
        "used": false,
        "named": false
    },
    {
        "name": "c_thumb,g_face,h_100,w_80",
        "allowed_for_strict": false,
        "used": true,
        "named": false
    },
    {
        "name": "c_fill,h_75,w_75/jpg",
        "allowed_for_strict": false,
        "used": true,
        "named": false
    }
    ],
    "next_cursor": "8edbc61040178db60b0973ca9494bf3a"
}
```

---

### Get transformation details

Get details of a single transformation. Supply either the name of the transformation or the transformation parameters.

#### Syntax
`GET /transformations/:transformation`

```multi
|ruby 
Cloudinary::Api.transformation(transformation, options = {})

|php_2
$api->transformation($transformation, $options = []);

|python 
cloudinary.api.transformation(transformation, **options)

|nodejs
cloudinary.v2.api.transformation(transformation, options).then(callback);

|java 
api.transformations(String transformation, Map options);

|csharp
cloudinary.GetTransform(TransformParams params);

|go
resp, err := cld.Admin.GetTransformation(ctx, admin.GetTransformationParams{})

|cli
cld admin transformation (transformation options)

```
#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| transformation | String | The name of the transformation or the transformation parameters. |

> **NOTE**: If the derived assets don't have an extension, add "/" at the end of the transformation value: For example: `f_webp,q_80,b_blue,w_200,h_200` becomes `f_webp,q_80,b_blue,w_200,h_200/`

#### Optional parameters
| Parameter | Type | Description |
|---|---|---|---|
| max\_results | Integer | Maximum number of derived assets to return (up to 500). **Default**: `10`.  |
| next\_cursor | String | When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of a following request. |

#### Examples
Get transformation by name:

```multi
|ruby 
result = Cloudinary::Api
.transformation('w_150,h_100,c_fill')

|php_2
$result = $api
->transformation("w_150,h_100,c_fill");

|python 
result = cloudinary.api\
.transformation("w_150,h_100,c_fill")

|nodejs
cloudinary.v2.api
.transformation('w_150,h_100,c_fill')
.then(result=>console.log(result)); 

|java 
result = api
.transformations("w_150,h_100,c_fill", ObjectUtils.emptyMap());

|csharp
result = cloudinary
.GetTransform("w_150,h_100,c_fill");

|go
resp, err := cld.Admin.GetTransformation(ctx, admin.GetTransformationParams{Transformation: "w_150,h_100,c_fill"})

|curl 
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/w_150,h_100,c_fill

|cli
cld admin transformation "w_150,h_100,c_fill"
```

Get transformation by parameters:

```multi
|ruby 
result = Cloudinary::Api
.transformation(width: 150, height: 100,
  crop: "fill")

|php_2
$result = $api
->transformation(["width" => 150, "height" => 100,
  "crop" => "fill"]);

|python 
result = cloudinary.api\
.transformation(dict(width = 150, height = 100, crop = "fill"))

|nodejs
cloudinary.v2.api
.transformation({width: 150, height: 100, crop: 'fill'})
.then(result=>console.log(result)); 

|java 
result = api
.transformation(new Transformation().width(150).height(100).
  crop("fill").generate(), ObjectUtils.emptyMap());

|csharp
Not supported by this SDK

|go
Not supported by this SDK

|curl 
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/c_fill,h_100,w_150

|cli
cld admin transformation '{"width": 500, "height": 100, "crop": "fill"}'
```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response
```json
{
  "name": "w_150,h_100,c_fill",
  "allowed_for_strict": false,
  "used": true,
  "named": false,
  "info": [
    {
      "width": 150,
      "height": 100,
      "crop": "fill"
    }
  ],
  "derived": [
    {
      "public_id": "sample",
      "resource_type": "image",
      "type": "upload",
      "format": "jpg",
      "url":
        "http://res.cloudinary.com/cld-docs/image/upload/w_150,h_100,c_fill/v1341141057/sample.jpg",
      "secure_url":
        "https://res.cloudinary.com/cld-docs/image/upload/w_150,h_100,c_fill/v1341141057/sample.jpg",
      "bytes": 10202,
      "id": "2adf1841874c7b2326d1f90cbedbc914"
    }
  ]
}

```

---

### Create a named transformation

Create a new named transformation.

#### Syntax
`POST /transformations/:name`

```multi
|ruby 
Cloudinary::Api.create_transformation(name, transformation, options)

|php_2
$api->createTransformation($name, $transformation, $options);

|python 
cloudinary.api.create_transformation(name, transformation, **options)

|nodejs
cloudinary.v2.api.create_transformation(name, transformation, options).then(callback);

|java 
api.createTransformations(String name, String transformation);

|csharp
cloudinary.CreateTransform(createTransformParams params);

|go
resp, err := cld.Admin.CreateTransformation(ctx, admin.CreateTransformationParams{})

|cli
cld admin create_transformation (name, transformation, options)
```
#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| name | String | The name of the transformation. |
| transformation | String | The transformation parameters. |

#### Optional parameters
| Parameter | Type | Description |
|---|---|---|---|
| allowed\_for\_strict | Boolean | Whether to allow this named transformation when [strict transformations](control_access_to_media#strict_transformations) are enabled. **Default**: `true`. |

#### Examples
Create a named transformation by string:

```multi

|ruby
result = Cloudinary::Api
.create_transformation('small_fill',
  'w_150,h_100,c_fill')

|php_2
$result = $api
->createTransformation("small_fill", "w_150,h_100,c_fill");

|python
result = cloudinary.api\
.create_transformation("small_fill",
  "w_150,h_100,c_fill")

|nodejs
cloudinary.v2.api
.create_transformation('small_fill',
  'w_150,h_100,c_fill')
.then(result=>console.log(result)); 

|java
result = api
.createTransformation("small_fill", "w_150,h_100,c_fill",
  ObjectUtils.emptyMap());

|csharp
var createTransformParams = new CreateTransformParams(){
  Name = "small_fill",
  Transformation = new Transformation().Width(150).Height(100).Crop("fill")};
cloudinary.CreateTransform(createTransformParams);

|go
resp, err := cld.Admin.CreateTransformation(ctx, admin.CreateTransformationParams{
      Name:           "small_fill", 
      Transformation: "w_150,h_100,c_fill"})

|curl
curl \
  -d 'transformation=w_150,h_100,c_fill' \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/small_fill

|cli
cld admin create_transformation "small_fill" "w_150,h_100,c_fill"
```

Create a named chained transformation by string:

```multi

|ruby
result = Cloudinary::Api
.create_transformation('circle_fill',
  'ar_1.0,c_fill,w_250/r_max/q_auto')

|php_2
$result = $api
->createTransformation("circle_fill", "ar_1.0,c_fill,w_250/r_max/q_auto");

|python
result = cloudinary.api\
.create_transformation("circle_fill",
  "ar_1.0,c_fill,w_250/r_max/q_auto")

|nodejs
cloudinary.v2.api
.create_transformation('circle_fill',
  'ar_1.0,c_fill,w_250/r_max/q_auto')
.then(result=>console.log(result)); 

|java
result = api
.createTransformation("circle_fill", "ar_1.0,c_fill,w_250/r_max/q_auto",
  ObjectUtils.emptyMap());

|csharp
var createTransformParams = new CreateTransformParams(){
  Name = "circle_fill",
  Transformation = new Transformation()
  .AspectRatio("1.0").Width(250).Crop("fill").Chain()
  .Radius("max").Chain()
  .Quality("auto")};
cloudinary.CreateTransform(createTransformParams);

|go
resp, err := cld.Admin.CreateTransformation(ctx, admin.CreateTransformationParams{
      Name:           "circle_fill", 
      Transformation: "ar_1.0,c_fill,w_250/r_max/q_auto"})

|curl
curl \
  -d 'transformation=ar_1.0,c_fill,w_250/r_max/q_auto' \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/circle_fill

|cli
cld admin create_transformation "circle_fill" "ar_1.0,c_fill,w_250/r_max/q_auto"
```

Create a named transformation by parameters:

```multi

|ruby
result = Cloudinary::Api
.create_transformation('small_fill2',
  {width: 150, height: 100, crop: "fill"})

|php_2
$result = $api
->createTransformation("small_fill2",
  ["width" => 150, "height" => 100, "crop" => "fill"]);

|python
result = cloudinary.api\
.create_transformation("small_fill2",
  dict(width = 150, height = 100, crop = "fill"))

|nodejs
cloudinary.v2.api
.create_transformation('small_fill2',
  { width: 150, height: 100, crop: 'fill' })
.then(result=>console.log(result)); 

|java
result = api
.createTransformation("small_fill2",
  new Transformation().width(150).height(100).crop("fill").generate(),
  ObjectUtils.emptyMap());

|csharp
var createTransformParams = new CreateTransformParams(){
  Name = "small_fill2",
  Transformation = new Transformation().Width(150).Height(100).Crop("fill")};
cloudinary.CreateTransform(createTransformParams);

|go
Not supported by this SDK

|curl
curl \
  -d 'transformation=w_150,h_100,c_fill' \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/small_fill2

|cli
cld admin create_transformation "small_fill2" '{"width": 150, "height": 100, "crop": "fill"}'
```

Create a named chained transformation by parameters:

```multi

|ruby
result = Cloudinary::Api
.create_transformation('circle_fill2',
  [{aspect_ratio: "1.0", width: 250, crop: "fill"},
  {radius: "max"},
  {quality: "auto"}
  ])

|php_2
$result = $api
    ->createTransformation("circle_fill2", [
        "transformation" => [
            ["width" => 250, "crop" => "fill", "aspect_ratio" => "1.0"],
            ["radius" => "max"],
            ["quality" => "auto"]
        ]]);

|python
result = cloudinary.api.create_transformation("circle_fill2",
    dict(
        transformation=[
            dict(width=250, crop="fill", aspect_ratio="1.0"),
            dict(radius="max"),
            dict(quality="auto")
        ]))

|nodejs
cloudinary.v2.api
.create_transformation('circle_fill2',
  { transformation: [
  { aspect_ratio: "1.0", width: 250, crop: "fill"},
  { radius: "max"},
  { quality: "auto"}]})
.then(result=>console.log(result)); 

|java
result = api
.createTransformation("circle_fill2",
  new Transformation()
  .aspectRatio("1.0").width(250).crop("fill").chain()
  .radius("max").chain()
  .quality("auto").generate(),
  ObjectUtils.emptyMap());

|csharp
var createTransformParams = new CreateTransformParams(){
  Name = "circle_fill2",
  Transformation = new Transformation()
  .AspectRatio("1.0").Width(250).Crop("fill").Chain()
  .Radius("max").Chain()
  .Quality("auto")};
cloudinary.CreateTransform(createTransformParams);

|go
Not supported by this SDK

|curl
curl \
  -d 'transformation=ar_1.0,c_fill,w_250/r_max/q_auto' \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/circle_fill2

|cli
cld admin create_transformation "circle_fill2" '{"transformation": [{"width": 250,"crop": "fill","aspect_ratio": "1.0"},{"radius": "max"},{"quality": "auto"}]}'
```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response
```json
{
 "message": "created"
}
```

---

### Update transformation

Update a specific transformation. 

[//]: # (identical text, but with slightly different formatting in partial_named_transformation_note - if updating here, update there too)
> **INFO**: Before you update the transformation parameters of an existing named transformation that's already used in production, make sure you're aware of all existing instances. To mitigate risk, when you update the parameters of an existing named transformation (via the Console UI or API), existing derived assets using the named transformation {valeExclude}are **not**{/valeExclude} automatically invalidated and regenerated. 

If you're sure you want to apply the new definition to any already derived assets with that named transformation, you must specifically [invalidate](invalidate_cached_media_assets_on_the_cdn) those transformations or otherwise modify the other parameters in that delivery URL, so that the asset {valeExclude}will be{/valeExclude} re-derived using the new definition on next request.

**Tip**: You can use the [regen_derived](cloudinary_cli#regen_derived) CLI command to invalidate and then regenerate derived assets after updating the definition for a named transformation.

#### Syntax
`PUT /transformations/:transformation`

```multi
|ruby 
Cloudinary::Api.update_transformation(transformation, options = {})

|php_2
$api->updateTransformation($transformation, $options = []);

|python 
cloudinary.api.update_transformation(transformation, **options)

|nodejs
cloudinary.v2.api.update_transformation(transformation, options).then(callback);

|java 
api.updateTransformations(String transformation, Map options));

|csharp
cloudinary.UpdateTransform(updateTransformParams params);

|go
resp, err := cld.Admin.UpdateTransformation(ctx, admin.UpdateTransformationParams{})

|cli
cld admin update_transformation (transformation, options)  
```

#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| transformation | String | The name of the transformation or a listing of the transformation parameters. |

#### Optional parameters
| Parameter | Type | Description |
|---|---|---|---|
| allowed\_for\_strict | Boolean | Whether to allow this named transformation when [strict transformations](control_access_to_media#strict_transformations) are enabled.  |
| unsafe_update | String | **Required when modifying the transformation parameters of an existing named transformation.** The new transformation definition for the named transformation.  Because the changed definition can be unsafe for (significantly change) assets in production, the change is applied only to newly generated derived assets that reference this named transformation. To apply the change to existing derived assets using this named transformation, invalidate them so that they'll be regenerated with the new definition when next requested.

#### Examples
Allow transformation by name:

```multi

|ruby
result = Cloudinary::Api
.update_transformation('on_sale_overlay',
  allowed_for_strict: true)

|php_2
$result = $api
->updateTransformation("on_sale_overlay",
  ["allowed_for_strict" => 1]);

result = cloudinary.api\
.update_transformation("on_sale_overlay",
  allowed_for_strict = True)

|nodejs
cloudinary.v2.api
.update_transformation('on_sale_overlay',
  { allowed_for_strict: true })
.then(result=>console.log(result)); 

|java
result = api
.updateTransformation("on_sale_overlay",
  ObjectUtils.asMap("allowed_for_strict", true);

|csharp
var updateTransformParams = new UpdateTransformParams(){
  Transformation = "on_sale_overlay",
  Strict = true};
cloudinary.UpdateTransform(updateTransformParams);

|go
resp, err := cld.Admin.UpdateTransformation(ctx, admin.UpdateTransformationParams{
      Transformation:   "on_sale_overlay", 
      AllowedForStrict: api.Bool(true)})

|curl
curl \
  -d 'allowed_for_strict=true' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/on_sale_overlay

|cli
cld admin update_transformation "on_sale_overlay" allowed_for_strict=true

```

Disallow transformation by parameter listing:

```multi

|ruby
result = Cloudinary::Api
.update_transformation(
  { width: 150, height: 100, crop: "fill"},
  { allowed_for_strict: false })

|php_2
$result = $api
->updateTransformation(
  ["width" => 150, "height" => 100,"crop" => "fill"],
  ["allowed_for_strict" => 0]);

|python
result = cloudinary.api\
.update_transformation(
  dict(width = 150, height = 100, crop = "fill"), 
  allowed_for_strict = False)

|nodejs
cloudinary.v2.api
.update_transformation(
  { width: 150, height: 100, crop: 'fill' },
  { allowed_for_strict: false })
.then(result=>console.log(result)); 

|java
result = api
.updateTransformation(
  new Transformation().width(150).height(100).crop("fill").generate(), 
  ObjectUtils.asMap("allowed_for_strict", false);

|csharp
var updateTransformParams = new UpdateTransformParams(){
  Transformation = "w_150,h_100,c_fill",
  Strict = false};
cloudinary.UpdateTransform(updateTransformParams);

|go
resp, err := cld.Admin.UpdateTransformation(ctx, admin.UpdateTransformationParams{
      Transformation:   "w_150,h_100,c_fill", 
      AllowedForStrict: false})

|curl
curl \
  -d 'allowed_for_strict=false' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/c_fill,h_100,w_150

|cli
cld admin update_transformation '{"width": 150, "height": 100, "crop": "fill"}' allowed_for_strict=false

```

Update the transformation definition for a named transformation:

```multi
|ruby
result = Cloudinary::Api
.update_transformation('my_named',
  unsafe_update: { crop: "scale", width: 103 })

|php_2
$result = $api
->updateTransformation("my_named",
  ["unsafe_update" => ["crop" => "scale", "width" => 103]]);

|python
result = cloudinary.api\
.update_transformation("my_named",
  unsafe_update=dict(transformation=[{"crop" : "scale", "width" : 103 }]))

|nodejs
cloudinary.v2.api
.update_transformation("my_named",
  {unsafe_update: {crop: 'scale', width: 103}})
.then(result=>console.log(result)); 
  
|java
result = api
.updateTransformation("my_named",
  ObjectUtils.asMap("unsafe_update",
  new Transformation().crop("scale").width(103).generate());

|csharp
var updateTransformParams = new UpdateTransformParams(){
  Transformation = "my_named",
  UnsafeTransform = new Transformation().Crop("scale").Width(103)};
cloudinary.UpdateTransform(updateTransformParams);

|go
resp, err := cld.Admin.UpdateTransformation(ctx, admin.UpdateTransformationParams{
      Transformation: "Test",
      UnsafeUpdate:   "c_scale,w_103"})

|curl
curl \
  -d 'unsafe_update=c_scale,w_103' \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/my_named

|cli
cld admin update_transformation my_named unsafe_update='{"crop": "scale", "width": 103}'

```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response
```json
{
 "message": "updated"
}
```

---

### Delete transformation

Delete a single transformation. Supply either the name of the transformation or the transformation parameters.

[//]: # (nearly identical text, but with slightly different formatting in partial_named_transformation_note - if updating here, update there too)
> **INFO**:
>
> Before you **delete** an existing named transformation, make sure you aren't using that transformation in production. When you **delete** an existing named transformation via the Console UI or API, and if there are fewer than 1000 existing derived assets using that named transformation, they're automatically invalidated (and {valeExclude}will{/valeExclude} return a `404` error on the next request). 
> If there are 1000 or more such derived assets, the delete request fails with a `403` error indicating that your named transformation has `too many derived resources` or `too many dependent transformations` (when the derived assets use the named transformation in combination with other parameters).

#### Syntax
`DELETE /transformations/:transformation`

```multi
|ruby 
Cloudinary::Api.delete_transformation(transformation)

|php_2
$api->deleteTransformation($transformation);

|python 
cloudinary.api.delete_transformation(transformation)

|nodejs
cloudinary.v2.api.delete_transformation(transformation, callback});

|java 
api.deleteTransformation(String transformation);

|csharp
cloudinary.DeleteTransform(transformation);

|go
resp, err := cld.Admin.DeleteTransformation(ctx, admin.DeleteTransformationParams{})

|cli
cld admin delete_transformation (transformation)

```
#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| transformation | String | The name of the transformation or the transformation parameters. |

> **NOTE**: If the derived assets don't have an extension, add "/" at the end of the transformation value: For example: `f_webp,q_80,b_blue,w_200,h_200` becomes `f_webp,q_80,b_blue,w_200,h_200/`

#### Examples
Delete transformation by name:

```multi

|ruby
result = Cloudinary::Api
.delete_transformation('w_150,h_100,c_fill')

|php_2
$result = $api
->deleteTransformation("w_150,h_100,c_fill");

|python
result = cloudinary.api\
.delete_transformation("w_150,h_100,c_fill")

|nodejs
cloudinary.v2.api
.delete_transformation('w_150,h_100,c_fill')
.then(result=>console.log(result)); 

|java
result = api
.deleteTransformation("w_150,h_100,c_fill",
  ObjectUtils.emptyMap());

|csharp
result = cloudinary
.DeleteTransform("w_150,h_100,c_fill");

|go
resp, err := cld.Admin.DeleteTransformation(ctx, admin.DeleteTransformationParams{Transformation: "w_150,h_100,c_fill"})

|curl
curl  \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/w_150,h_100,c_fill

|cli
cld admin delete_transformation "w_150,h_100,c_fill"

```

Delete transformation by parameters:

```multi

|ruby
result = Cloudinary::Api
.delete_transformation(width: 150, height: 100,
  crop: "fill")

|php_2
$result = $api
->deleteTransformation(["width" => 150, "height" => 100,
  "crop" => "fill"]);

|python
result = cloudinary.api\
.delete_transformation(dict(width = 150, height = 100,
  crop = "fill"))

|nodejs
cloudinary.v2.api
.delete_transformation(
  {width: 150, height: 100, crop: 'fill'})
.then(result=>console.log(result)); 

|java
result = api
.deleteTransformation(new Transformation().width(150).height(100).
  crop("fill").generate(), ObjectUtils.emptyMap());

|csharp
Not supported by this SDK

|go
Not supported by this SDK

|curl
curl \
  -X DELETE \  
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/transformations/c_fill,h_100,w_150

|cli
cld admin delete_transformation '{"width": 150, "height": 100, "crop": "fill"}'

```
> **NOTE**: If running the CLI command on Windows, you need to escape the double quotes within the curly braces using either `\` or `"`, for example, `\"text\"` or `""text""`.
#### Sample response
```json
{
 "message": "deleted"
}
```
## triggers

Run in Postman
Learn more about running Postman collections

Enables you to manage event triggers and notifications within your product environment.  Each `trigger` denotes a unique [event type](#event_types_table) linked to its notification URL. Your product environment supports triggers up to a maximum determined by multiplying the number of unique event types by the limit of 30 notification URLs.

> **NOTE**:
>
> You can manage webhook notifications via the [Webhook Notifications](https://console.cloudinary.com/app/settings/webhooks) page of the Console Settings. Because a `trigger` consists of a single triggering event paired with a single notification URL, whereas in the Console each notification URL is linked to all configured **Notification Types** (triggering events), programmatically creating a trigger reflects in the Console by either generating a new notification URL with a single **Notification Type** or appending a new **Notification Type** to an existing URL's list of notifications. For more information, see [Managing webhook notifications from the Console](notifications#managing_webhook_notifications_from_the_console).

Method | Description
---|---
GET<code class="code-method">/triggers | [Lists all triggers.](#get_triggers) 
POST<code class="code-method">/triggers | [Creates a new trigger.](#create_a_trigger)
PUT<code class="code-method">/triggers/:id | [Updates the notification URL for a trigger.](#update_a_trigger)
DELETE<code class="code-method">/triggers/:id | [Deletes a trigger.](#delete_a_trigger)

> **NOTE**: This endpoint isn't currently supported by SDKs.

---

### Get triggers

Lists all triggers.

#### Syntax
`GET /triggers`

#### Optional parameters
Parameter | Type | Description
---|---|---
`event_type` | String | Filters and retrieves triggers for a specific [event_type](#event_type).

#### Example
List all triggers associated with the "upload" `event_type`:

```multi

|curl
curl 'https://<API_KEY>:<API_SECRET>@api-dev.cloudinary.com/api/v1_1/<CLOUD_NAME>/triggers?event_type=upload'
```

#### Sample response
```javascript
{
    "triggers": [{
        id: "1532jklas",
        product_environment_id: "asdlkfjlkwqeng129384",
        uri_type: "webhook",
        uri: "https://mysite.example.com/my_notification_endpoint",
        event_type: "upload",
        created_at: "2023-03-29T09:32:59Z",
        updated_at: "2023-15-14T06:09:21Z",
  }, ...]
}
```
---

### Create a trigger

Creates a new trigger. Your product environment supports triggers up to a maximum determined by multiplying the number of unique event types by the limit of 30 notification URLs.

#### Syntax
`POST /triggers`

#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| uri | String | The URL that will receive the notification response. |
| event_type | String | The type of event that will trigger the notification response.**Possible values:** See the [table](#event_types_table).

#### event_type possible values
> **NOTE**:
>
> The **Value** corresponds to the **Notification type(s)** in the [Webhook Notifications](https://console.cloudinary.com/app/settings/webhooks) page of the Console Settings and the `notification_type` in the response.

{table:class=small-1stcol-regfont}Value | Description | Source
---|---|---
`all` | Any of the event types. |
`access_control_changed` | Access control for an asset is changed. | - [resources](admin_api#update_details_of_an_existing_resource) method of the Admin API - Console UI operation
`bulk_refresh_auto_fetch` | Refresh of fetched assets is completed. | - For more information, see [Refreshing fetched assets (images only)](fetch_remote_images#deleting_and_refreshing_fetched_assets)
`create_folder` | A new folder is created. | - [create_folder](admin_api#create_folder) method of the Admin API  - Console UI operation
`delete` | An asset is deleted. | - [destroy](image_upload_api_reference#destroy) method of the Upload API - [resources](admin_api#update_details_of_an_existing_resource) method of the Admin API - Console UI operation
`delete_by_token` | An asset is deleted using a deletion token. | - [delete_by_token](client_side_uploading#deleting_client_side_uploaded_assets) method of the jQuery SDK
`delete_folder` | A folder is deleted. | - [delete_folder](admin_api#delete_folder) method of the Admin API call  - Console UI operation
`eager` | An eager transformation is requested and completed. | - [eager] (eager_and_incoming_transformations#eager_transformations) transformation included in an [upload](image_upload_api_reference#upload) method API call
`error` | An error occurs during upload. | - [upload](image_upload_api_reference#upload) API call  - Console UI operation 
`explode` | Derived images are created from a multi-page file. | - [explode](image_upload_api_reference#explode) method of the upload API
`generate_archive` | An archive file is generated. | - [generate_archive](image_upload_api_reference#generate_archive) method of the Admin API
`info` | Actions that involve gathering information about an asset (such as background removal and auto-tagging) are completed. | - Add-ons applied during a call to the [upload](image_upload_api_reference#upload) method  - Console UI operation
`invalidate_custom_cdn` | Cached copies of an asset are invalidated from a customer owned CDN. | - [upload](image_upload_api_reference#upload) API call |
`moderation` | An asset is approved or rejected. | - Moderations applied during a call to the [upload](image_upload_api_reference#upload) method - Console UI operation
`moderation_summary` | An asset is marked for multiple moderations is approved or rejected. | - Multiple moderations applied during a call to the [upload](image_upload_api_reference#upload) method  - Console UI operation
`move` | An asset is moved between folders (not relevant if your product environment is using the legacy fixed folder mode). | - [resources](admin_api#update_details_of_an_existing_resource) method of the Admin API  - Console UI operation
`move_or_rename_asset_folder` | A folder is moved to a different location within the folder hierarchy or renamed (not relevant if your product environment is using the legacy fixed folder mode). | - Console UI operation
`multi` | Animated image, video or PDF is created from multiple assets. | - [multi](image_upload_api_reference#multi) method of the upload API
`proof_status_changed` | The status of a proof changes during the approval flow. | - Console UI operation
`publish` | A public link is generated for sharing an asset via a dedicated website. | - Console UI operation
`rename` | An asset is renamed (or, if your product environment is using the legacy fixed folder mode, moved to a different folder). | - [rename](image_upload_api_reference#rename) method of the Upload API - [resource](admin_api#update_details_of_an_existing_resource) method of the Admin API (fixed folder mode only)  - Console UI operation 
`report` | A last access report is created.| - [resources last access reports](admin_api#resources_last_access_reports)
`related_assets` | Asset relationships are added or removed. | - [add_related_assets](admin_api#add_related_assets) method of the Admin API - [delete_related_assets](admin_api#delete_related_assets) method of the Admin API - Console UI operation
`resource_context_changed` | Contextual metadata is changed. | - [resource](admin_api#update_details_of_an_existing_resource) method of the Admin API  - Console UI operation 
`resource_display_name_changed` | An asset's display name is changed (not relevant if your product environment is using the legacy fixed folder mode). | - [resource](admin_api#update_details_of_an_existing_resource) method of the Admin API  - Console UI operation 
`resource_metadata_changed` | Structural metadata is changed. | - [resource](admin_api#update_details_of_an_existing_resource) method of the Admin API  - Console UI operation
`resource_tags_changed` | Tags are changed. | - [resource](admin_api#update_details_of_an_existing_resource) method of the Admin API  - Console UI operation
`restore_asset_version` | A previous version of an asset is restored within the Media Library. | - Console UI operation
`upload` | An asset is uploaded. | - [upload](image_upload_api_reference#upload) API call - Console UI operation

> **NOTE**: The response for the `explicit` method is sent to the notification URL that handles the action specified in the call.

#### Example
Set up the `https://mysite.example.com/my_notification_endpoint` URL to receive a notification whenever an `upload` is completed:

```multi

|curl
curl 'https://<API_KEY>:<API_SECRET>@api-dev.cloudinary.com/api/v1_1/<CLOUD_NAME>/triggers' \
--header 'Content-Type: application/json' \
--data '{
    "uri": "https://mysite.example.com/my_notification_endpoint",
    "event_type": "upload",
}'

```

#### Sample response
```javascript
"triggers": {
      id: "1ajkfl2389740vml",
      product_environment_id: "12346asdfjkl78901",
      uri_type: "webhook",
      uri: "https://mysite.example.com/my_notification_endpoint",
      event_type: "upload",
      created_at: "2023-03-29T09:32:59Z",
      updated_at: "2023-03-29T09:32:59Z",
}

```

---

### Update a trigger

Updates a notification URL for a trigger. 

> **NOTE**: You can't update the `event_type` for a trigger. If you want to update an `event_type` for a specific notification URL, delete the relevant trigger and then create a new one.

#### Syntax
`PUT /triggers/:id`

#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| id | String | The ID of the trigger to update.
| new_uri | String | The updated URL that will receive the notification response. |

#### Example
Update the notification URL to `https://mysite.example.com/my_new_notification_endpoint` URL for a trigger with ID `1ajkfl2389740vml`:

```multi

|curl
curl --request PUT 'https://<API_KEY>:<API_SECRET>@api-dev.cloudinary.com/api/v1_1/<CLOUD_NAME>/triggers/1ajkfl2389740vml' \
--form 'new_uri="https://mysite.example.com/my_new_notification_endpoint"'

```

#### Sample response
```javascript
{
  "message" : "ok"
}

```

---

### Delete a trigger

Deletes a trigger.

#### Syntax
`DELETE /triggers/:id`

#### Required parameters
| Parameter | Type | Description |
|---|---|---|---|
| id | String | The ID of the trigger to delete.

#### Example
Delete the trigger with ID `1ajkfl2389740vml`:

```multi

|curl
curl --request DELETE 'https://<API_KEY>:<API_SECRET>@api-dev.cloudinary.com/api/v1_1/<CLOUD_NAME>/triggers/1ajkfl2389740vml'

```

#### Sample response
```javascript
{
  "message" : "ok"
}

```

## upload_mappings

Run in Postman
Learn more about running Postman collections

Dynamically retrieves assets from existing online locations and uploads the files to your product environment. 

See the [Auto upload remote files](migration#lazy_migration_with_auto_upload) documentation for more information.

Method | Description
---|---
GET<code class="code-method">/upload_mappings/:folder | [Lists all upload mappings by folder.](#get_upload_mappings) 
GET<code class="code-method">/upload_mappings/?folder=:folder | [Lists the details of a single upload mapping.](#get_the_details_of_a_single_upload_mapping) 
POST<code class="code-method">/upload_mappings | [Creates a new upload mapping folder and its template (URL).](#create_an_upload_mapping)
PUT<code class="code-method">/upload_mappings | [Updates an existing upload mapping folder with a new template (URL).](#update_an_upload_mapping)
DELETE<code class="code-method">/upload_mappings/?folder=:folder | [Deletes an upload mapping by folder name.](#delete_an_upload_mapping)

---

### Get upload mappings

List all upload mappings by folder and includes its mapped template (URL prefix).
    
#### Syntax
`GET /upload_mappings`

```multi
|ruby
Cloudinary::Api.upload_mappings(options = {})

|php_2
$api->uploadMappings($options = []);

|python
cloudinary.api.upload_mappings(**options)

|nodejs
cloudinary.v2.api.upload_mappings(options).then(callback);

|java
api.uploadMappings(Map options);

|csharp
cloudinary.UploadMappings(uploadMappingParams params);

|go
resp, err := cld.Admin.ListUploadMappings(ctx, admin.ListUploadMappingsParams{})

|cli
cld admin upload_mappings (options)
```

#### Optional parameters
Parameter | Type | Description
---|---|---
max\_results | Integers |  Maximum number of assets to return (up to 500). **Default**: `10`. 
next\_cursor | String | When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of a following request.

#### Examples
List all upload mappings

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_mappings

|ruby
result = Cloudinary::Api
.upload_mappings

|php_2
$result = $api
->uploadMappings();

|python
result = cloudinary.api\
.upload_mappings()

|nodejs
cloudinary.v2.api
.upload_mappings()
.then(result=>console.log(result)); 

|java
result = api
.uploadMappings(ObjectUtils.emptyMap());

|csharp
result = cloudinary
.UploadMappings();

|go
resp, err := cld.Admin.ListUploadMappings(ctx, admin.ListUploadMappingsParams{})

|cli
cld admin upload_mappings
```

#### Sample response
```json
{
    "mappings": [
      {
        "folder": "wiki", 
        "template": "https://u.wiki.example.com/wiki-images/",
        "external_id": "cc3e3ege-7c5z-4893-a56b-d7265e35e12y"
      },
      {
        "folder": "example", 
        "template": "https://images.example.com/product_assets/my-images/",
        "external_id": "bg3e3ege-8e5z-9593-z36b-l8265e40e12y"
      }, 
    ]
}
```

---

### Get the details of a single upload mapping

Retrieve the mapped template (URL prefix) of a specified upload mapping folder.

#### Syntax
`GET /upload_mappings?folder=:folder`

```multi
|ruby 
Cloudinary::Api.upload_mapping(folder)

|php_2
$api->uploadMapping($folder);

|python 
cloudinary.api.upload_mapping(folder)

|nodejs
cloudinary.v2.api.upload_mapping(folder).then(callback);

|java 
api.uploadMapping(String folder));

|csharp
cloudinary.UploadMapping(uploadMappingParams params);

|go
resp, err := cld.Admin.GetUploadMapping(ctx, admin.GetUploadMappingParams{})

|cli
cld admin upload_mapping (folder)
```

#### Required parameters
Parameter | Type | Description
---|---|---
folder | String | The name of the folder to map.

#### Examples
Upload mapping details by folder the 'wiki' folder:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_mappings?folder=wiki

|ruby
result = Cloudinary::Api
.upload_mapping('wiki')

|php_2
$result = $api
->uploadMapping("wiki");

|python
result = cloudinary.api\
.upload_mapping("wiki")

|nodejs
cloudinary.v2.api
.upload_mapping('wiki')
.then(result=>console.log(result)); 

|java
result = api
.uploadMapping("wiki",
  ObjectUtils.emptyMap());

|csharp
result = cloudinary
.UploadMapping("wiki");

|go
resp, err := cld.Admin.GetUploadMapping(ctx, admin.GetUploadMappingParams{Folder: "wiki"})

|cli
cld admin upload_mapping "wiki"
```

#### Sample response
```json
{
	"folder": "wiki", 
	"template": "https://u.wiki.example.com/wiki-images/",
    "external_id": "mv3e3ege-235z-0193-x56b-n6265e35e12y"
}
```

---

### Create an upload mapping 
   
Create a new upload mapping folder and its template (URL).

#### Syntax
`POST /upload_mappings`

```multi
|ruby 
Cloudinary::Api.create_upload_mapping(folder, options = {})

|php_2
$api->createUploadMapping(folder, $options = []);

|python 
cloudinary.api.create_upload_mapping(folder, **options)

|nodejs
cloudinary.v2.api.create_upload_mapping(folder, options).then(callback);

|java 
api.createUploadMapping(String folder, Map options));

|csharp
cloudinary.CreateUploadMapping(uploadMappingParams params);

|go
resp, err := cld.Admin.CreateUploadMapping(ctx, admin.CreateUploadMappingParams{})

|cli
cld admin create_upload_mapping (folder, options) 
```

#### Required parameters
Parameter | Type | Description
---|---|---
folder | String | The name of the folder to map.
template | String | The URL prefix to be mapped to the folder, as part of `options`.

#### Examples
Create upload mapping from 'https://www.example.com/images/' to a folder called 'my_map':

```multi
|curl
curl \
 -d "folder=my_map&template=https://www.example.com/images/" \
 -X POST \
 https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_mappings

|ruby
result = Cloudinary::Api
.create_upload_mapping("my_map",
  template: "https://www.example.com/images/")

|php_2
$result = $api-
>createUploadMapping("my_map",
  ["template" => "https://www.example.com/images/"]);

|python
result = cloudinary.api\
.create_upload_mapping("my_map",
  template = "https://www.example.com/images/")

|nodejs
cloudinary.v2.api
.create_upload_mapping('my_map',
  { template: "https://www.example.com/images/" })
.then(result=>console.log(result)); 

|java
result = api
.createUploadMapping("my_map",
  ObjectUtils.asMap("template", "https://www.example.com/images/"));

|csharp
result = cloudinary
.CreateUploadMapping("my_map", "https://www.example.com/images/");

|go
resp, err := cld.Admin.CreateUploadMapping(ctx, admin.CreateUploadMappingParams{
      Folder:     "my_map", 
      Template:   "https://www.example.com/images/"})

|cli
cld admin create_upload_mapping "my_map" template="https://www.example.com/images/"
``` 

#### Sample response
```json
{
    "message": "created",
    "folder": "my_map",
    "external_id": "cc3e3eba-7c2a-4814-a58c-d7265e35e17c"
}
```

---

### Update an upload mapping

Update an existing upload mapping folder with a new template (URL).

#### Syntax
`PUT /upload_mappings`
    
```multi
|ruby 
Cloudinary::Api.update_upload_mapping(folder, options = {})

|php_2
$api->updateUploadMapping(folder, $options = []);

|python 
cloudinary.api.update_upload_mapping(folder, **options)

|nodejs
cloudinary.v2.api.update_upload_mapping(folder, options).then(callback);

|java 
api.updateUploadMapping(String folder, Map options));

|csharp
cloudinary.UpdateUploadMapping(uploadMappingParams params);

|go
resp, err := cld.Admin.UpdateUploadMapping(ctx, admin.UpdateUploadMappingParams{})

|cli
cld admin update_upload_mapping (folder) 
```

#### Required parameters
Parameter | Type | Description
---|---|---
folder | String | The name of the folder to map.
template | String | The URL prefix to be mapped to the folder, as part of `options`.

#### Examples
Update an upload mapping to the 'wiki' folder with the `https://u.wiki.com/images/` URL:

```multi
|curl
curl \
  -d "folder=wiki&template=https://u.wiki.com/images/" \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_mappings
          
|ruby
result = Cloudinary::Api
.update_upload_mapping("wiki",
  template: "https://u.wiki.com/images/")

|php_2
$result = $api
->updateUploadMapping("wiki",
  ["template" => "https://u.wiki.com/images/"]);

|python
result = cloudinary.api\
.update_upload_mapping("wiki",
  template = "https://u.wiki.com/images/")

|nodejs
cloudinary.v2.api
.update_upload_mapping('wiki',
  { template: "https://u.wiki.com/images/" })
.then(result=>console.log(result)); 

|java
result = api
.updateUploadMapping("wiki",
  ObjectUtils.asMap("template", "https://u.wiki.com/images/"), ObjectUtils.emptyMap());

|csharp
var uploadMappingParams = new UploadMappingParams(){
  Folder = "wiki",
  Template = "https://u.wiki.com/images/";
cloudinary.UploadMapping(uploadMappingParams);

|go
resp, err := cld.Admin.UpdateUploadMapping(ctx, admin.UpdateUploadMappingParams{
		Folder:   "wiki",
		Template: "https://u.wiki.com/images/"})

|cli
cld admin update_upload_mapping "wiki" template="https://u.wiki.com/images/"
```

#### Sample response
```json
{
	"message": "updated",
    "external_id": "cc3e3eba-7c2a-4814-a58c-d7265e35e17c"
}
```

---

### Delete an upload mapping

Delete an upload mapping by folder name.

#### Syntax
`DELETE /upload_mappings?folder=:folder`

```multi
|ruby 
Cloudinary::Api.delete_upload_mapping(folder)

|php_2
$api->deleteUploadMapping(folder);

|python 
cloudinary.api.delete_upload_mapping(folder)

|nodejs
cloudinary.v2.api.delete_upload_mapping(folder).then(callback);

|java 
api.deleteUploadMapping(String folder);

|csharp
cloudinary.DeleteUploadMapping(uploadMappingParams params);

|go
resp, err := cld.Admin.DeleteUploadMapping(ctx, admin.DeleteUploadMappingParams{})

|cli
cld admin delete_upload_mapping (folder)
```

#### Required parameters
Parameter | Type | Description
---|---|---
folder | String | The name of the folder to map.

#### Examples
Delete an upload mapping to the 'wiki' folder:

```multi
|curl
curl \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_mappings?folder=wiki

|ruby
result = Cloudinary::Api
.delete_upload_mapping('wiki')

|php_2
$result = $api
->deleteUploadMapping("wiki");

|python
result = cloudinary.api\
.delete_upload_mapping("wiki")

|nodejs
cloudinary.v2.api
.delete_upload_mapping('wiki')
.then(result=>console.log(result)); 

|java
result = api
.deleteUploadMapping("wiki",
  ObjectUtils.emptyMap());

|csharp
result = cloudinary
.DeleteUploadMapping("wiki");

|go
resp, err := cld.Admin.DeleteUploadMapping(ctx, admin.DeleteUploadMappingParams{Folder: "wiki"})

|cli
cld admin delete_upload_mapping "wiki"
```

#### Sample response
```json
{
	"message": "deleted",
    "external_id": "cc3e3eba-7c2a-4814-a58c-d7265e35e17c"
}
```
  

## upload_presets

Run in Postman
Learn more about running Postman collections

Enables you to centrally define image upload options instead of specifying them in each upload call. 

See the [upload preset](upload_presets) documentation for more information.

Method | Description
---|---
GET <code class="code-method">/upload_presets | [Lists the upload presets defined for your product environment.](#get_upload_presets)
GET <code class="code-method">/upload_presets/:name | [Lists the details of a single upload preset.](#get_the_details_of_a_single_upload_preset)
POST<code class="code-method">/upload_presets | [Creates a new upload preset.](#create_an_upload_preset)
PUT<code class="code-method">/upload_presets/:name | [Updates an existing, specified upload preset.](#update_an_upload_preset)
DELETE<code class="code-method">/upload_presets/:name | [Deletes an existing, specified upload preset.](#delete_an_upload_preset)

---

### Get upload presets

Lists the upload presets defined for your product environment.

#### Syntax
`GET /upload_presets`

```multi
|ruby
Cloudinary::Api.upload_presets(options = {})

|php_2
$api->uploadPresets($options = []);

|python
cloudinary.api.upload_presets(**options)

|nodejs
cloudinary.v2.api.upload_presets(options).then(callback);

|java
api.uploadPresets(Map options);

|csharp
cloudinary.ListUploadPresets(uploadPresetParams params);

|go
resp, err := cld.Admin.ListUploadPresets(ctx, admin.ListUploadPresetsParams{})

|cli
cld admin upload_presets (options)
```

#### Optional parameters
Parameter | Type | Description
---|---|---
max\_results | Integers |  Maximum number of assets to return (up to 500). **Default**: `10`. 
next\_cursor | String | When a request has more results to return than `max_results`, the `next_cursor` value is returned as part of the response. You can then specify this value as the `next_cursor` parameter of a following request.

#### Examples
List all upload presets:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_presets

|ruby
result = Cloudinary::Api
.upload_presets

|php_2
$result = $api
->uploadPresets();

|python
result = cloudinary.api\
.upload_presets()

|nodejs
cloudinary.v2.api
.upload_presets()
.then(result=>console.log(result));

|java
result = api
.uploadPresets(ObjectUtils.emptyMap());

|csharp
result = cloudinary
.ListUploadPresets();

|go
resp, err := cld.Admin.ListUploadPresets(ctx, admin.ListUploadPresetsParams{})

|cli
cld admin upload_presets
```

#### Sample response
```json
{
    "presets": [
      {
        "name": "pd1e4lst",
        "unsigned": true,
        "settings": 
          {
            "transformation": "c_crop,g_custom/ar_1,c_pad,w_1.0"
          },
        "external_id": "3206588g-8aer-11lk-a619-0e9959f955x6"
      }, 
      {
        "name": "remote_media",
        "unsigned": false,
        "settings": 
          {
            "tags": "test",
            "allowed_formats": "jpg,png",
            "eager": "c_fill,g_face,h_150,w_200"
          },
        "external_id": "4706299f-392e-10j2f-ag62-0e9936t955c5"
      }, 
    ]
} 
```

---
### Get the details of a single upload preset

Retrieves the details of an upload preset.
   
#### Syntax
`GET /upload_presets/:name`

```multi
|ruby
Cloudinary::Api.upload_preset(name, options = {})

|php_2
$api->uploadPreset($name, $options = []);

|python
cloudinary.api.upload_preset(name, **options)

|nodejs
cloudinary.v2.api.upload_preset(name, options).then(callback);

|java
api.uploadPreset(String name, Map options);

|csharp
cloudinary.GetUploadPreset(uploadPresetParams params);

|go
resp, err := cld.Admin.GetUploadPreset(ctx, admin.GetUploadPresetParams{})

|cli
cld admin upload_preset (name) 
``` 

#### Required parameters
Parameter | Type | Description
---|---|---
name | String | The name of the upload preset.

#### Examples
Upload preset details for the 'remote_media' preset:

```multi
|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_presets/remote_media

|ruby
result = Cloudinary::Api
.upload_preset('remote_media')

|php_2
$result = $api
->uploadPreset("remote_media");

|python
result = cloudinary.api\
.upload_preset("remote_media")

|nodejs
cloudinary.v2.api
.upload_preset('remote_media')
.then(result=>console.log(result)); 

|java
result = api
.uploadPreset("remote_media",
  ObjectUtils.emptyMap());

|csharp
result = cloudinary
.GetUploadPreset("remote_media");

|go
resp, err := cld.Admin.GetUploadPreset(ctx, admin.GetUploadPresetParams{Name: "remote_media"})

|cli
cld admin upload_preset "remote_media"
```

#### Sample response
```json
{
    "name": "remote_media",
    "unsigned": false,
    "settings": 
      {
        "tags": "test",
        "allowed_formats": "jpg,png",
        "eager": "c_fill,g_face,h_150,w_200"
      },
    "external_id": "3206588g-8aer-11lk-a619-0e9959f955x6"
}
```

---
### Create an upload preset

Create a new upload preset.
    
#### Syntax
`POST /upload_presets`

```multi
|ruby
Cloudinary::Api.create_upload_preset(options = {})

|php_2
$api->createUploadPreset($options = []);

|python
cloudinary.api.create_upload_preset(**options)

|nodejs
cloudinary.v2.api.create_upload_preset(options).then(callback);

|java
api.createUploadPreset(Map options);

|csharp
cloudinary.CreateUploadPreset(uploadPresetParams params);

|go
resp, err := cld.Admin.CreateUploadPresets(ctx, admin.CreateUploadPresetsParams{})

|cli
cld admin create_upload_preset (options)
``` 

#### Optional parameters
Parameter | Type | Description
---|---|---
name|String| The name to assign to the new upload preset. If not specified, a random name is generated. If the name is of an existing preset, it will be overwritten.
unsigned| Boolean| Whether this upload preset allows unsigned uploading to Cloudinary. **Default**: `false`.   
disallow\_public\_id|Boolean|Whether this upload preset disables assigning a `public_id` in the upload call.  **Default**: `false`. **Note**: When `true` in unsigned upload presets, `unique_filename` is also automatically set to `true`.
live |Boolean| Whether to enable "live broadcast", so that the upload preset can be used for [live streaming](video_live_streaming). **Default**: `false`  
use\_asset\_folder\_as\_public\_id\_prefix | Boolean |  **Not relevant for product environments using the legacy fixed folder mode.**Whether to automatically apply the path specified in the `asset_folder` parameter (or the asset folder that's in focus when an asset is uploaded directly to a folder in the Cloudinary Console user interface) as a prefix to the specified or generated `public_id` value. This ensures that the public ID **path** will always match the **initial** asset folder. This can help to retain the behavior that previously existed in fixed folder mode. However, keep in mind that even when this option is used during upload, an asset with a certain public ID path can later be moved to a completely different asset folder hierarchy without impacting the public ID. This option only ensures path matching for the initial upload. Relevant only when `public_id_prefix` (or `folder`) hasn't been separately specified.**Default**: `false`
{Upload parameters}|  | All supported [upload](image_upload_api_reference#upload) parameters are also supported for upload presets. Those you include will be applied to all assets uploaded with this preset.  If any of the same parameters are also specified directly in the upload call, those values will override the values in the upload preset.

#### Examples
Create a new upload preset called 'my_preset', that allows unsigned uploading, adds the tag 'remote' to uploaded images, and only allows the uploading of JPG and PNG image formats:

```multi
|curl
curl \
  -d "name=my_preset&unsigned=true&tags=remote&allowed_formats=jpg,png" \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_presets

|ruby
result = Cloudinary::Api
.create_upload_preset(
  name: "my_preset",
  unsigned: true, 
  tags: "remote", 
  allowed_formats: "jpg,png")

|php_2
$result = $api
->createUploadPreset([
    "name" => "my_preset", 
    "unsigned" => true, 
    "tags" => "remote", 
    "allowed_formats" => "jpg,png"]); 

|python
result = cloudinary.api\
.create_upload_preset(
  name = "my_preset",
  unsigned = True, 
  tags = "remote", 
  allowed_formats = "jpg,png")

|nodejs
cloudinary.v2.api
.create_upload_preset(
  { name: "my_preset", 
    unsigned: true, 
    tags: "remote", 
    allowed_formats: "jpg,png" })
.then(result=>console.log(result)); 

|java
result = api
.createUploadPreset(
  ObjectUtils.asMap(
  	"name", "my_preset",
  	"unsigned", true, 
  	"tags" => "remote", 
  	"allowed_formats" => "jpg,png"));

|csharp
var uploadPresetParams = new UploadPresetParams(){
  Name = "my_preset",
  Unsigned = true,
  Tags = "remote",
  AllowedFormats = "jpg,png"};
cloudinary.CreateUploadPreset(uploadPresetParams);

|go
resp, err := cld.Admin.CreateUploadPreset(ctx, admin.CreateUploadPresetParams{
      Name:         "my_preset",
      Unsigned:     api.Bool(true),
      UploadParams: uploader.UploadParams{Tags: []string{"remote"}, AllowedFormats: []string{"jpg", "png"}}})

|cli
cld admin create_upload_preset name="my_preset" unsigned="true" tags="remote" allowed_formats="[jpg","png]"
```

Creates a new upload preset called 'my_preset', that allows signed uploading only, adds the tag 'special' to uploaded images, and applies the named transformation 'watermark' as an incoming transformation.

```multi
|curl
curl \
  -d "name=my_preset&unsigned=true&tags=remote&allowed_formats=jpg,png&transformation=t_watermark" \
  -X POST \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_presets

|ruby
result = Cloudinary::Api
.create_upload_preset(
  name: "my_preset",
  unsigned: false, 
  tags: "special", 
  transformation: "watermark")

|php_2
$result = $api
->createUploadPreset([
    "name" => "my_preset", 
    "unsigned" => false, 
    "tags" => "special", 
    "transformation" => "watermark"]); 

|python
result = cloudinary.api\
.create_upload_preset(
  name = "my_preset",
  unsigned = False, 
  tags = "special", 
  transformation = "watermark")

|nodejs
cloudinary.v2.api
.create_upload_preset(
  { name: "my_preset", 
    unsigned: false, 
    tags: "special", 
    transformation: "watermark" })
.then(result=>console.log(result)); 

|java
result = api
.createUploadPreset(
  ObjectUtils.asMap(
  	"name", "my_preset",
  	"unsigned", false, 
  	"tags", "special", 
  	"transformation", "watermark"));

|csharp
var uploadPresetParams = new UploadPresetParams(){
  Name = "my_preset",
  Unsigned = false,
  Tags = "special",
  Transformation = new Transformation().NamedTransformation("watermark")};
cloudinary.CreateUploadPreset(uploadPresetParams);

|go
resp, err := cld.Admin.CreateUploadPreset(ctx, admin.CreateUploadPresetParams{
      Name:         "my_preset",
      Unsigned:     api.Bool(false),
      UploadParams: uploader.UploadParams{Tags: []string{"special"}, AllowedFormats: []string{"jpg", "png"}, Transformation: "t_watermark"}})

|cli
cld admin create_upload_preset name="my_preset" unsigned="false" tags="special" transformation="t_watermark"
```

#### Sample response
```json
{
    "message": "created",
    "name": "my_preset",
    "external_id": "76124885-9d1c-4638-8105-a16e4558a399"
}
```

---

### Update an upload preset

Update an existing upload preset.
    
#### Syntax
`PUT /upload_presets/:name`

```multi
|ruby
Cloudinary::Api.update_upload_preset(name, options = {})

|php_2
$api->updateUploadPreset($name, $options = []);

|python
cloudinary.api.update_upload_preset(name, **options)

|nodejs
cloudinary.v2.api.update_upload_preset(name, options).then(callback);

|java
api.updateUploadPreset(String name, Map options);

|csharp
cloudinary.UpdateUploadPreset(uploadPresetParams params);

|go
resp, err := cld.Admin.UpdateUploadPreset(ctx, admin.UpdateUploadPresetParams{})

|cli
cld admin update_upload_preset (name, options) 
``` 

#### Required parameters
Parameter | Type | Description
---|---|---
name|String| The name of the upload preset.

#### Optional parameters
Parameter | Type | Description
---|---|---
unsigned| Boolean| Whether this upload preset allows unsigned uploading to Cloudinary. **Default**: `false`.   
disallow\_public\_id|Boolean|Whether this upload preset disables assigning a public_id in the upload call.  **Default**: `false`.  **Note**: When `true` in unsigned upload presets, `unique_filename` is also automatically set to `true`.
live |Boolean| Whether to enable "live broadcast", so that the upload preset can be used for [live streaming](video_live_streaming).   
{Upload parameters}|  | The [upload](image_upload_api_reference#upload) parameters to apply to assets uploaded with this preset.

#### Examples
Update an upload preset called 'wiki', to allow unsigned uploading, add the tag 'remote' to uploaded images, and only allow the uploading of JPG and PNG image formats:

```multi
|curl
curl \
  -d "unsigned=true&tags=remote&allowed_formats=jpg,png" \
  -X PUT \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_presets/wiki
    
|ruby
result = Cloudinary::Api
.update_upload_preset("wiki",
  unsigned: true, 
  tags: "remote", 
  allowed_formats: "jpg,png")

|php_2
$result = $api
->updateUploadPreset("wiki", [
    "unsigned" => true, 
    "tags" => "remote", 
    "allowed_formats" => "jpg,png"]);

|python
result = cloudinary.api\
.update_upload_preset("wiki",
  unsigned = True, 
  tags = "remote", 
  allowed_formats = "jpg,png")

|nodejs
cloudinary.v2.api.
update_upload_preset('wiki',
  { unsigned: true,
    tags: "remote", 
    allowed_formats: "jpg,png"})
.then(result=>console.log(result)); 

|java
result = api
.updateUploadPreset("wiki",
  ObjectUtils.asMap(
    "unsigned", true, 
    "tags" => "remote", 
    "allowed_formats" => "jpg,png"));

|csharp
var uploadPresetParams = new UploadPresetParams(){
  Name = "wiki",
  Unsigned = true,
  Tags = "remote",
  AllowedFormats = "jpg,png"};
cloudinary.UpdateUploadPreset(uploadPresetParams);

|go
resp, err := cld.Admin.UpdateUploadPreset(ctx, admin.UpdateUploadPresetParams{
      Name:         "wiki",
      Unsigned:     api.Bool(true),
      UploadParams: uploader.UploadParams{Tags: []string{"remote"}, AllowedFormats: []string{"jpg", "png"}}})

|cli
cld admin update_upload_preset "wiki" unsigned="true" tags="remote" allowed_formats='["jpg","png"]'
```

#### Sample response
```json
{
	"message": "updated",
    "external_id": "cc3e3eba-7c2a-4814-a58c-d7265e35e17c"
}
```

---
### Delete an upload preset 

Delete an existing upload preset.

#### Syntax
`DELETE /upload_presets/:name`

```multi
|ruby 
Cloudinary::Api.delete_upload_preset(name)

|php_2
$api->deleteUploadPreset($name);

|python 
cloudinary.api.delete_upload_preset(name)

|nodejs
cloudinary.v2.api.delete_upload_preset(name).then(callback);

|java 
api.deleteUploadPreset(String name);

|csharp
cloudinary.DeleteUploadPreset(String name);

|go
resp, err := cld.Admin.DeleteUploadPreset(ctx, admin.DeleteUploadPresetParams{})

|cli
cld admin delete_upload_preset (name)
```

#### Required parameters
Parameter | Type | Description
---|---|---
name | String | The name of the upload preset.

#### Examples
Delete an upload preset called 'remote_media':

```multi
|curl
curl \
  -X DELETE \
  https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<cloud_name>/upload_presets/remote_media

|ruby
result = Cloudinary::Api
.delete_upload_preset('remote_media')

|php_2
$result = $api
->deleteUploadPreset("remote_media");

|python
result = cloudinary.api\
.delete_upload_preset("remote_media")

|nodejs
cloudinary.v2.api
.delete_upload_preset('remote_media')
.then(result=>console.log(result)); 

|java
result = api
.deleteUploadPreset("remote_media",
  ObjectUtils.emptyMap());

|csharp
result = cloudinary
.DeleteUploadPreset("remote_media");

|go
resp, err := cld.Admin.DeleteUploadPreset(ctx, admin.DeleteUploadPresetParams{Name: "remote_media"})

|cli
cld admin delete_upload_preset "remote_media"
```

#### Sample response
```json
{
	"message": "deleted",
    "external_id": "76124885-9d1c-4638-8105-a16e4558a399"
}
```

## usage

Run in Postman
Learn more about running Postman collections

Enables you to get a report on the status of your product environment **usage**, including storage, credits, bandwidth, requests, number of resources, and add-on usage. Note that numbers are updated periodically.

Method | Description
---|---
GET <code class="code-method">/usage | [Lists product environment usage details.](#get_product_environment_usage_details)

---
### Get product environment usage details

#### Syntax
`GET /usage `

```multi
|ruby
Cloudinary::Api.usage

|php_2
$api->usage();

|python
cloudinary.api.usage()

|nodejs
cloudinary.v2.api.usage().then(callback);;

|java
api.usage(ObjectUtils.emptyMap());

|csharp
cloudinary.GetUsage();

|go
resp, err := cld.Admin.Usage(ctx, admin.UsageParams{})

|cli
cld admin usage
```

#### Optional parameters
Parameter | Type | Description
---|---|---
date | String |  The date for the usage report. Must be within the last 3 months and specified in the format: `yyyy-mm-dd`. **Default**: the current date

#### Examples
Return a usage report for the 10th of November, 2019 (2019-11-10):

```multi
|ruby
result = Cloudinary::Api
.usage(date: "2019-11-10")

|php_2
$result = $api
->usage(["date" => "2019-11-10"]);

|python
result = cloudinary.api\
.usage(date = "2019-11-10")

|nodejs
cloudinary.v2.api
.usage({date: '2019-11-10'})
.then(result=>console.log(result));

|java
result = api
.usage(ObjectUtils.asMap("date", "2019-11-10"));

|csharp
result = cloudinary
.GetUsage("2019-11-10");

|go
resp, err := cld.Admin.Usage(ctx, admin.UsageParams{Date: time.Date(2019, time.Month(11), 21, 0, 0, 0, 0, time.UTC)})

|curl
curl https://<API_KEY>:<API_SECRET>@api.cloudinary.com/v1_1/<CLOUD_NAME>/usage/date=2019-11-10

|cli
cld admin usage date="2019-11-10"
```

#### Sample response
The response contains an object with detailed usage information.

```json
{
    "plan": "Basic",
    "last_updated": "2023-05-08",
    "date_requested": "2023-05-09T00:00:00Z",
    "transformations": {
        "usage": 10151688,
        "limit": 40003000,
        "used_percent": 25.38,
        "breakdown": {
            "transformation": 9041599,
            "frame": 394134,
            "image_to_video_frame": 105447,
            "sd_video_second": 225064,
            "hd_video_second": 22422,
            "audio_second": 114,
            "extra_avif_mp_encoding": 2763,
            "av1_sd_video_second": 2204,
            "av1_hd_video_second": 2621,
            "extra_avif_frame": 3075,
            "abr_vod_streaming_second": 14960,
            "three_d_transformation": 215,
            "video_content_aware_crop": 7693,
            "fourk_video_second": 2820,
            "eightk_video_second": 55,
            "av1_fourk_video_second": 316
        }
    },
    "objects": {
        "usage": 19642456
    },
    "bandwidth": {
        "usage": 5995728643541,
        "limit": 21993453780992,
        "used_percent": 27.26
    },
    "storage": {
        "usage": 2993024407597,
        "limit": 21991843168256,
        "used_percent": 13.61
    },
    "requests": 164812306,
    "resources": 10305176,
    "derived_resources": 9337280,
    "imagga_crop": {
        "usage": 114,
        "limit": 10000
    },
    "remove_the_background": {
        "usage": 1,
        "limit": 3
    },
    "google_tagging": {
        "usage": 5220,
        "limit": 125000
    },
    "cloudinary_ai": {
        "usage": 337,
        "limit": 1000
    },
    "media_limits": {
        "image_max_size_bytes": 157286400,
        "video_max_size_bytes": 3145728000,
        "raw_max_size_bytes": 2097152000,
        "image_max_px": 100000000,
        "asset_max_total_px": 300000000
    }
}
```

